"use client";
import React, { useEffect, useState } from "react";
import Pagenation from "./components/Pagenation";
import axios from "@/lib/axios";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ChatRoom } from "@/types/chat/chat.type";
import useSocketStore from "@/store/socketStore";
import { showAlert } from "@/utils/swal";

export default function MainPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { isAuthenticated } = useAuthStore();
  const { getSocket } = useSocketStore();
  const socket = getSocket();

  const router = useRouter();

  const getChatRoomList = async () => {
    try {
      const response = await axios.get("/api/chat/room/list", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      setChatRooms(response.data.result);
    } catch (error) {
      console.error("채팅방 목록을 불러오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleParticipantUpdated = (data: {
      roomId: string;
      participants: Array<{ user: string; joinedAt: string }>;
    }) => {
      setChatRooms((prev) =>
        prev.map((room) => {
          if (room._id === data.roomId) {
            return { ...room, participants: data.participants };
          }
          return room;
        })
      );
    };

    // 이벤트 리스너 등록
    socket.off("room_created").on("room_created", getChatRoomList);
    socket.off("room_deleted").on("room_deleted", getChatRoomList);
    socket
      .off("participant_updated")
      .on("participant_updated", handleParticipantUpdated);

    return () => {
      socket.off("room_created", getChatRoomList);
      socket.off("room_deleted", getChatRoomList);
      socket.off("participant_updated", handleParticipantUpdated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (isAuthenticated) {
      getChatRoomList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // 현재 페이지의 채팅방 목록만 반환
  const getCurrentPageRooms = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return chatRooms.slice(startIndex, endIndex);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(chatRooms.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRoomClick = async (roomId: string) => {
    try {
      const enterRoomResult = await axios.post("/api/chat/room/check", {
        roomId,
        password: "",
      });
      if (enterRoomResult.data.success) {
        router.push(`/room/${roomId}`);
      }
    } catch (e) {
      console.error(e);
      showAlert(
        "error",
        "채팅방 입장에 실패했습니다.",
        "존재하지 않는 방이거나 비밀번호가 틀렸습니다."
      );
    }
  };

  return (
    <div className='main-page p-4'>
      <div className='border-2 border-white p-4'>
        <div className='text-center border-b-2 border-white pb-2 mb-4'>
          ━━━━━━━━━━ 채팅방 목록 ━━━━━━━━━━
        </div>
        <div className='grid grid-cols-[auto_1fr_auto] gap-4 text-left'>
          <div className='border-b-2 border-white'>번호</div>
          <div className='border-b-2 border-white'>방제목</div>
          <div className='border-b-2 border-white'>참여자</div>

          {getCurrentPageRooms().map((room, index) => (
            <React.Fragment key={room._id}>
              <div className='text-yellow-400'>
                {((currentPage - 1) * itemsPerPage + index + 1)
                  .toString()
                  .padStart(2, "0")}
              </div>
              <div
                className='text-green-400 cursor-pointer hover:bg-blue-500/20'
                onClick={() => handleRoomClick(room._id)}
              >
                {room.isPublic ? room.room_name : "[비공개] " + room.room_name}
              </div>
              <div className='text-blue-400'>{room.participants.length}명</div>
            </React.Fragment>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className='mt-4 text-center border-t-2 border-white pt-2'>
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

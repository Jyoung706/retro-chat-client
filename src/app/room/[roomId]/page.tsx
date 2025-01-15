"use client";

import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import RoomHeader from "./components/RoomHeader";
import axios from "../../../lib/axios";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import useSocketStore from "@/store/socketStore";
import { SystemMessage } from "./interface/Message.interface";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const { isAuthenticated } = useAuthStore();
  const [roomName, setRoomName] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const { getSocket } = useSocketStore();
  const socket = getSocket();

  const getRoomInfo = async () => {
    const roomInfo = await axios.get(`/api/chat/room/detail/${params.roomId}`);
    setRoomName(roomInfo.data.result.room_name);
    setParticipantCount(roomInfo.data.result.participants.length);
  };

  useEffect(() => {
    if (!socket) return;

    const handleParticipantCount = (data: SystemMessage) => {
      if (data.sender_id === "System") {
        if (data.type === "join") {
          setParticipantCount((prev) => prev + 1);
        } else if (data.type === "leave") {
          setParticipantCount((prev) => prev - 1);
        }
      }
    };
    socket.on("receive_message", handleParticipantCount);

    return () => {
      socket.off("receive_message", handleParticipantCount);
    };
  }, [socket]);

  useEffect(() => {
    if (isAuthenticated) {
      getRoomInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <>
      <RoomHeader roomName={roomName} participantCount={participantCount} />
      <ChatMessages roomId={params.roomId} />
      <ChatInput roomId={params.roomId} />
    </>
  );
}

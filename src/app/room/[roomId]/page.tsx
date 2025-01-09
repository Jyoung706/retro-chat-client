"use client";

import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import RoomHeader from "./components/RoomHeader";
import axios from "../../../lib/axios";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

// 서버 컴포넌트로 동작
export default function RoomPage({ params }: RoomPageProps) {
  const { isAuthenticated } = useAuthStore();
  const [roomName, setRoomName] = useState("");
  const getRoomInfo = async () => {
    const roomInfo = await axios.get(`/api/chat/room/detail/${params.roomId}`);
    setRoomName(roomInfo.data.result.room_name);
  };
  useEffect(() => {
    if (isAuthenticated) {
      getRoomInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <>
      <RoomHeader roomName={roomName} />
      <ChatMessages roomId={params.roomId} />
      <ChatInput roomId={params.roomId} />
    </>
  );
}

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

export default function RoomPage({ params }: RoomPageProps) {
  const { isAuthenticated } = useAuthStore();
  const [roomName, setRoomName] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const getRoomInfo = async () => {
    const roomInfo = await axios.get(`/api/chat/room/detail/${params.roomId}`);
    setRoomName(roomInfo.data.result.room_name);
    setParticipantCount(roomInfo.data.result.participants.length);
  };
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

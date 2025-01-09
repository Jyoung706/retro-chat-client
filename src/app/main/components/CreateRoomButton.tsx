"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "../../../lib/axios";
import CreateRoomModal from "./CreateRoomModal";

export default function CreateRoomButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async (roomData: {
    room_name: string;
    isPublic: boolean;
    password?: string;
  }) => {
    try {
      const response = await axios.post("/api/chat/new", roomData);
      setIsModalOpen(false);
      router.push(`/room/${response.data.result._id}`);
    } catch (error) {
      console.log("방 생성 에러 : ", error);
    }
  };

  return (
    <>
      <button
        className='p-2 border border-white hover:bg-white/10'
        onClick={() => setIsModalOpen(true)}
      >
        방 생성
      </button>
      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRoom}
      />
    </>
  );
}

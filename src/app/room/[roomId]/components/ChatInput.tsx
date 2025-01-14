"use client";

import { SocketResponse } from "@/interface/Socket-response.interface";
import useSocketStore from "@/store/socketStore";
import { useState } from "react";

export default function ChatInput({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState("");
  const { getSocket } = useSocketStore();
  const socket = getSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // 메시지 전송 로직
      socket?.emit(
        "send_message",
        {
          room_id: roomId,
          message: message,
          isSystem: false,
        },
        (cb: SocketResponse) => {
          console.log(cb);
        }
      );
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='border-t-2 border-white pt-4'>
      <div className='flex'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='메시지를 입력하세요...'
          className='w-full bg-transparent border border-white/50 rounded px-3 py-2 focus:outline-none focus:border-white'
        />
        <button
          type='submit'
          className='px-3 py-2 bg-white text-[#1a1b1e] font-semibold hover:bg-blue-50 active:bg-blue-100 text-sm'
        >
          전송
        </button>
      </div>
    </form>
  );
}

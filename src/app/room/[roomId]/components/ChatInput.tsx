"use client";

import { useState } from "react";

export default function ChatInput({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // 메시지 전송 로직
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='border-t-2 border-white pt-4'>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 입력하세요...'
        className='w-full bg-transparent border border-white/50 rounded px-3 py-2 focus:outline-none focus:border-white'
      />
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export default function ChatMessages({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 웹소켓 연결 또는 실시간 채팅 로직
  }, [roomId]);

  return (
    <div className='flex-1 overflow-y-auto mb-4'>
      <div className='space-y-2'>
        {messages.map((msg) => (
          <div key={msg.id} className='text-yellow-400'>
            {msg.userId}: {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}

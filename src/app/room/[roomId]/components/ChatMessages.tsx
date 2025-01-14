"use client";

import useSocketStore from "@/store/socketStore";
import { useEffect, useState } from "react";
import { Message } from "../interface/Message.interface";

export default function ChatMessages({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { getSocket } = useSocketStore();
  const socket = getSocket();
  useEffect(() => {
    // 웹소켓 연결 또는 실시간 채팅 로직
    socket?.on("receive_message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket?.off("receive_message");
    };
  }, [socket]);

  return (
    <div className='flex-1 overflow-y-auto mb-4'>
      <div className='space-y-2'>
        {messages.map((msg) => (
          <div key={msg.id} className='text-white'>
            {msg.sender_id}: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

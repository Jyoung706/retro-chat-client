"use client";

import useSocketStore from "@/store/socketStore";
import { useEffect, useRef, useState } from "react";
import { Message } from "../interface/Message.interface";

export default function ChatMessages({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { getSocket } = useSocketStore();
  const socket = getSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;

    if (!chatContainer) return;

    const isNearBottom =
      chatContainer.scrollHeight -
        chatContainer.scrollTop -
        chatContainer.clientHeight <
      100;

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 웹소켓 연결 또는 실시간 채팅 로직
    if (!socket) return;
    socket.emit("enter_room", { roomId, password: "" });

    const handleReceiveMessage = (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket?.on("receive_message", handleReceiveMessage);

    return () => {
      socket?.off("receive_message", handleReceiveMessage);
    };
  }, [socket, roomId]);

  return (
    <div ref={chatContainerRef} className='flex-1 overflow-y-auto mb-4'>
      <div className='space-y-2'>
        {messages.map((msg) => (
          <div key={msg.id} className='text-white'>
            {msg.sender_id === "System" || msg.nickname === "System" ? (
              <div className='text-white text-center'>
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                <br />▶ {msg.message} ◀
                <br />
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
            ) : (
              <>
                {msg.nickname}: {msg.message}
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

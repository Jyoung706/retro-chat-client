"use client";
import { useEffect } from "react";
import axios from "../../lib/axios";

export default function MainPage() {
  const getChatRoomList = async () => {
    const chatRoomList = await axios.get("/test/chatRoomList.json");
    console.log("chat room List : ", chatRoomList);
  };

  useEffect(() => {
    getChatRoomList();
  }, []);

  return (
    <div className='main-page'>
      <h1>메인 페이지</h1>
      {/* 페이지 컨텐츠 */}
    </div>
  );
}

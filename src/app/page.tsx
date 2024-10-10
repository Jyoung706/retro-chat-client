"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullTitle = "90's 채팅";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setTitle(() => fullTitle.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white font-['DungGeunMo'] p-4">
      <h1 className='text-6xl mb-4 relative'>
        {title}
        <span
          className={`inline-block w-8 h-12 bg-white ml-1 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        ></span>
      </h1>
      <div className='w-full max-w-2xl text-center mb-4'>{"=".repeat(70)}</div>
      <div className='border-4 border-white p-6 w-[400px] max-w-xl'>
        <div className='mb-4'>
          <label htmlFor='id' className='block text-left mb-2'>
            아이디:
          </label>
          <input
            type='text'
            id='id'
            value={id}
            onChange={(e) => setId(e.target.value)}
            className='w-full bg-blue-900 border border-white p-2'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-left mb-2'>
            비밀번호:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-blue-900 border border-white p-2'
          />
        </div>
        <div className='flex justify-center'>
          <button className='border border-white p-2'>회원가입</button>
          <button className='ml-10 border border-white p-2'>접속</button>
        </div>
      </div>
    </div>
  );
}

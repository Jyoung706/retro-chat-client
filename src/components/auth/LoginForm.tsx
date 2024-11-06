"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  return (
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
          className='w-full bg-inherit border border-white p-2 focus:outline-none'
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
          className='w-full bg-inherit border border-white p-2 focus:outline-none'
        />
      </div>
      <div className='flex justify-center gap-10'>
        <Link
          href={"/signup"}
          className='border border-white p-2 hover:bg-white hover:text-blue-900'
        >
          회원가입
        </Link>
        <button className='border border-white p-2 hover:bg-white hover:text-blue-900'>
          접속
        </button>
      </div>
    </div>
  );
}

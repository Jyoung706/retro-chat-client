"use client";
import { showAlert } from "@/utils/swal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupForm() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !password || !nickname) {
      showAlert("error", "입력 오류!", "모든 입력 필드를 확인해주세요.");
      return;
    }

    const formData = {
      account: id,
      password,
      nickname,
    };
    try {
      const response = await fetch("/api/auth/regist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className='border-4 text-base sm:text-lg md:text-xl w-full max-w-2xl p-4 sm:p-8 [&_input]:bg-inherit'>
      <form className='flex flex-col sm:gap-8 w-full' onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'>
          <label htmlFor='account' className='sm:w-32 sm:mr-4'>
            아이디 :
          </label>
          <input
            id='account'
            className='border border-white focus:outline-none w-full'
            type='text'
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'>
          <label htmlFor='password' className='sm:w-32 sm:mr-4'>
            비밀번호 :{" "}
          </label>
          <input
            id='password'
            className='border border-white focus:outline-none w-full'
            value={password}
            type='password'
            onChange={handlePasswordChange}
          />
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'>
          <label htmlFor='nickname' className='sm:w-32 sm:mr-4'>
            닉네임 :{" "}
          </label>
          <input
            id='nickname'
            className='border border-white focus:outline-none w-full'
            type='text'
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <button
          type='submit'
          className='border-2 mt-12 sm:mt-20 text-white py-2 px-4 hover:bg-blue-600'
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

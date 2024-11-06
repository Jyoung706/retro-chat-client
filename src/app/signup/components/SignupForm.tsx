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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !password || !nickname) {
      showAlert("error", "입력 오류!", "모든 입력 필드를 확인해주세요.");
      return;
    }

    const formData = {
      id,
      password,
      nickname,
    };
    console.log(formData);
    router.push("/main");
  };
  return (
    <div className='border-4 text-xl w-1/2 h-[30rem] flex justify-center items-center'>
      <form className='flex flex-col gap-8 w-4/5' onSubmit={handleSubmit}>
        <div className='flex items-center'>
          <label htmlFor='account' className='w-32 mr-4'>
            아이디 :
          </label>
          <input
            id='account'
            className='bg-inherit border border-white focus:outline-none flex-1'
            type='text'
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='password' className='w-32 mr-4'>
            비밀번호 :{" "}
          </label>
          <input
            id='password'
            className='bg-inherit border border-white focus:outline-none flex-1'
            value={password}
            type='password'
            onChange={handlePasswordChange}
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='nickname' className='w-32 mr-4'>
            닉네임 :{" "}
          </label>
          <input
            id='nickname'
            className='bg-inherit border border-white focus:outline-none flex-1'
            type='text'
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <button
          type='submit'
          className='bg-inherit border-2 mt-20 text-white py-2 px-4 hover:bg-blue-600'
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

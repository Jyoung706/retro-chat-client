"use client";

import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showAlert } from "@/utils/swal";
import axios, { AxiosError } from "axios";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        account: id,
        password,
      });
      if (response.data.success) {
        setAccessToken(response.data.result.access_token);
        sessionStorage.setItem("un", response.data.result.nickname);
        sessionStorage.setItem("id", response.data.result._id);
      }
      router.push("/main");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (
          error.response?.data.error.message === "Unauthorized" ||
          error.response?.data.error.error === "Unauthorized"
        ) {
          showAlert(
            "error",
            "로그인 실패!",
            "아이디 또는 비밀번호를 확인해주세요."
          );
        } else {
          showAlert("error", "서버 점검", "서버 점검중입니다.");
        }
      }
    }
  };
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </div>
      <div className='flex justify-center gap-10'>
        <Link
          href={"/signup"}
          className='border border-white p-2 hover:bg-white hover:text-blue-900'
        >
          회원가입
        </Link>
        <button
          className='border border-white p-2 hover:bg-white hover:text-blue-900'
          onClick={handleLogin}
        >
          접속
        </button>
      </div>
    </div>
  );
}

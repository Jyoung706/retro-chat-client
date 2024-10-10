"use client";

import inputStore from "@/store/inputStore";
import React from "react";

// interface InputProps {
//   onCommand: (command: string) => void;
// }

const CommandInput: React.FC = () => {
  const { input, setInput, clearInput } = inputStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clearInput();
    }
  };
  return (
    <div className='flex items-center h-full border-t border-white pl-5 text-2xl'>
      <span>&gt;</span>
      <input
        className='bg-transparent ml-3 w-full focus:outline-none'
        type='text'
        placeholder='명령어를 입력하세요'
        value={input}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
      />
    </div>
  );
};

export default CommandInput;

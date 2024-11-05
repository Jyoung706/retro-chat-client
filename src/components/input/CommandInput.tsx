"use client";

import inputStore from "@/store/inputStore";
import { useState } from "react";

const CommandInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { processCommand } = inputStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className='flex items-center h-full border-t border-white pl-5 text-2xl'>
      <span>{">"}</span>
      <input
        className='bg-transparent ml-3 w-full focus:outline-none'
        type='text'
        placeholder='명령어를 입력하세요'
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
      />
    </div>
  );
};

export default CommandInput;

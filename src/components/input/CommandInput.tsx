"use client";

import inputStore from "@/store/inputStore";

const CommandInput: React.FC = () => {
  const { prompt, setInput, processCommand } = inputStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand();
    }
  };

  return (
    <div className='flex items-center h-full border-t border-white pl-5 text-2xl'>
      <span>{">"}</span>
      <input
        className='bg-transparent ml-3 w-full focus:outline-none'
        type='text'
        placeholder='명령어를 입력하세요'
        value={prompt}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
      />
    </div>
  );
};

export default CommandInput;

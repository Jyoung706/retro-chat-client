"use client";

import { useEffect, useState } from "react";

export default function TitleAnimation() {
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
    <h1 className='text-6xl mb-4 relative'>
      {title}
      <span
        className={`inline-block w-8 h-12 bg-white ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      ></span>
    </h1>
  );
}

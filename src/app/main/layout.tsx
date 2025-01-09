import { ReactNode } from "react";
import CreateRoomButton from "./components/CreateRoomButton";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='main-layout'>
      <header className='main-header text-center py-4 text-5xl mb-10 mt-10'>
        {"90's 채팅"}
      </header>

      <main className='main-content'>{children}</main>

      <footer className='main-footer flex justify-center items-center'>
        <CreateRoomButton />
      </footer>
    </div>
  );
}

export const metadata = {
  title: "레트로 채팅 메인 페이지",
  description: "메인 섹션의 레이아웃입니다",
};

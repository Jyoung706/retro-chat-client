import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='main-layout'>
      <header className='main-header'>{"헤더"}</header>

      <main className='main-content'>{children}</main>

      <footer className='main-footer'>{"푸터"}</footer>
    </div>
  );
}

export const metadata = {
  title: "레트로 채팅 메인 페이지",
  description: "메인 섹션의 레이아웃입니다",
};

import type { Metadata } from "next";
import "./globals.css";
import CommandInput from "@/components/input/CommandInput";

export const metadata: Metadata = {
  title: "Retro-chat",
  description: "고전 채팅 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title = "Back to 90's";
  return (
    <html lang='ko'>
      <body className='flex flex-col min-h-screen bg-blue-900 text-white'>
        <header className='text-center'>
          <h1 className='text-[4rem] font-bold'>{title}</h1>
          <div
            className='text-xl font-mono overflow-hidden whitespace-nowrap'
            style={{ width: "100%" }}
          >
            {"=".repeat(500)}
          </div>
        </header>
        <main className='flex-grow overflow-y-auto pl-4 text-2xl'>
          {children}
        </main>
        <footer className='h-10'>
          <CommandInput />
        </footer>
      </body>
    </html>
  );
}

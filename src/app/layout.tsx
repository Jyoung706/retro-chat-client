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
      <body className='min-h-screen bg-blue-900 p-4 text-white'>
        <header className='text-center'>
          <h1 className='text-[4rem] font-bold'>{title}</h1>
          <div
            className='text-xl font-mono overflow-hidden whitespace-nowrap'
            style={{ width: "100%" }}
          >
            {"=".repeat(500)}
          </div>
        </header>
        <main>{children}</main>
        <footer className='fixed bottom-0 left-0 right-0 h-10'>
          <CommandInput />
        </footer>
      </body>
    </html>
  );
}

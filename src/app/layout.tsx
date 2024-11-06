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
  return (
    <html lang='ko'>
      <body className='flex flex-col min-h-screen bg-blue-900 text-white'>
        <main className='flex-grow overflow-y-auto pl-4'>{children}</main>
      </body>
    </html>
  );
}

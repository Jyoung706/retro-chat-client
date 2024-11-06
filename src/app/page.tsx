import LoginForm from "@/components/auth/LoginForm";
import TitleAnimation from "@/components/common/TitleAnimation";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white p-4'>
      <TitleAnimation />
      <div className='w-full max-w-2xl text-center mb-4'>{"=".repeat(70)}</div>
      <LoginForm />
    </div>
  );
}

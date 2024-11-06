import { SignupForm } from "./components";

export default function SignUp() {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold text-center mb-14 mt-16'>회원가입</h1>
      <SignupForm />
    </div>
  );
}

import { useRouter } from "next/navigation";

interface RoomHeaderProps {
  roomName: string;
  participantCount: number;
}

export default function RoomHeader({
  roomName,
  participantCount,
}: RoomHeaderProps) {
  const router = useRouter();

  return (
    <div className='flex flex-col border-b-2 border-white pb-2 mb-4'>
      <div className='flex items-center justify-between'>
        <button
          onClick={() => router.push("/main")}
          className='text-xl hover:text-yellow-400'
        >
          ◀ 뒤로가기
        </button>
        <div className='text-3xl'>━━━━━━━━━━ {roomName} ━━━━━━━━━━</div>
        <div className='w-[100px]'></div>
      </div>
      <div className='text-center text-yellow-400 mt-2'>
        현재 참가중인 유저 수 : {participantCount}명
      </div>
    </div>
  );
}

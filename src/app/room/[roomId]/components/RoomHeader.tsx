export default function RoomHeader({ roomName }: { roomName: string }) {
  console.log(roomName);
  return (
    <div className='text-center border-b-2 border-white pb-2 mb-4 text-3xl'>
      ━━━━━━━━━━ {roomName} ━━━━━━━━━━
    </div>
  );
}

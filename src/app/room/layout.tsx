export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 h-screen'>
      <div className='border-2 border-white h-full p-4 flex flex-col'>
        {children}
      </div>
    </div>
  );
}

import { useState } from "react";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomData: {
    room_name: string;
    isPublic: boolean;
    password?: string;
  }) => Promise<void>;
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      room_name: roomName,
      isPublic,
      password: isPublic ? undefined : password,
    });

    setRoomName("");
    setPassword("");
    setIsPublic(true);
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-blue-900 border-2 border-white p-6 w-96'>
        <h2 className='text-center border-b-2 border-white pb-2 mb-4'>
          ━━━━━━━━━━ 방 만들기 ━━━━━━━━━━
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='text'
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder='방 제목'
              className='w-full bg-transparent border border-white/50 rounded px-3 py-2 focus:outline-none focus:border-white'
              required
            />
          </div>

          <div className='flex items-center space-x-2'>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className='form-checkbox'
              />
              <span>공개방</span>
            </label>
          </div>

          {!isPublic && (
            <div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='비밀번호'
                className='w-full bg-transparent border border-white/50 rounded px-3 py-2 focus:outline-none focus:border-white'
                required
              />
            </div>
          )}

          <div className='flex justify-end space-x-2 pt-4 border-t border-white/30'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border border-white/50 hover:bg-white/10'
            >
              취소
            </button>
            <button
              type='submit'
              className='px-4 py-2 border border-white hover:bg-white/10'
            >
              생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

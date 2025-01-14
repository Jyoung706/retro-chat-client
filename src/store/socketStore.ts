import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketStore {
  socket: Socket | null;
  connect: (token: string) => void;
  disconnect: () => void;
  getSocket: () => Socket | null;
}

const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,

  connect: (token: string) => {
    if (get().socket) {
      get().socket?.disconnect();
    }

    const isDev = process.env.NODE_ENV === "development";
    const socket = io(
      `${
        isDev
          ? process.env.NEXT_PUBLIC_DEV_API_URL
          : process.env.NEXT_PUBLIC_PROD_API_URL
      }/chats`,
      {
        auth: {
          token: `Bearer ${token}`,
        },
        transports: ["websocket"],
        autoConnect: true,
      }
    );

    // 기본 이벤트 리스너 설정
    socket.on("connect", () => {
      console.log("채팅 소켓 연결 성공!");
    });

    socket.on("connect_error", (error) => {
      console.error("채팅 소켓 연결 에러:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("채팅 소켓 연결 종료:", reason);
    });

    socket.on("exception", (error) => {
      console.error("채팅 소켓 에러 : ", error);
    });

    set({ socket });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },

  getSocket: () => get().socket,
}));

export default useSocketStore;

import { create } from "zustand";

interface User {
  _id: string;
  account: string;
  nickname: string;
}

interface UserStore {
  userData: User | null;
  setUserData: (userData: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (userData) =>
    set({
      userData,
    }),
}));

export default useUserStore;

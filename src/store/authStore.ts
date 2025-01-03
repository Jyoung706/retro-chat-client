import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (token) =>
    set({ accessToken: token, isAuthenticated: !!token }),
}));

export default useAuthStore;

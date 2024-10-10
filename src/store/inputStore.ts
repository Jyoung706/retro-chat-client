import { create } from "zustand";

interface InputStore {
  input: string;
  setInput: (input: string) => void;
  clearInput: () => void;
}

const inputStore = create<InputStore>((set) => ({
  input: "",
  setInput: (input: string) => {
    set({ input });
    return input;
  },
  clearInput: () => set({ input: "" }),
}));

export default inputStore;

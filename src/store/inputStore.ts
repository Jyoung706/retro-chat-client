import { create } from "zustand";

interface InputStore {
  prompt: string;
  currentState: string;
  commandMapper: { [key: string]: string };
  setInput: (propmpt: string) => void;
  processCommand: () => void;
}

const inputStore = create<InputStore>((set, get) => ({
  prompt: "",
  currentState: "initial",
  commandMapper: {
    "/login": "login",
    "/signin": "signin",
  },
  setInput: (prompt: string) => set({ prompt }),
  processCommand: () => {
    const { prompt, commandMapper } = get();
    const newState = commandMapper[prompt.toLowerCase()] || "initial";
    set({ currentState: newState, prompt: "" });
  },
}));

export default inputStore;

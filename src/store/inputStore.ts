import { create } from "zustand";

type InputReturnType = {
  type: string;
  value: string;
};
interface InputStore {
  commandMapper: { [key: string]: string };
  processCommand: (value: string) => InputReturnType;
}

const inputStore = create<InputStore>((set, get) => ({
  commandMapper: {
    login: "login",
    signin: "signin",
  },
  processCommand: (value) => {
    const isCommand = value.includes("/");
    if (isCommand) {
      const userCommand = value.split("/")[1].toLowerCase();
      console.log(userCommand);
      return {
        type: "command",
        value: userCommand,
      };
    }
    return {
      type: "normal",
      value,
    };
  },
}));

export default inputStore;

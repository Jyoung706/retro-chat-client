export interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  message: string;
  isSystem: boolean;
  nickname: string;
}

export interface SystemMessage extends Message {
  type: "join" | "leave";
}

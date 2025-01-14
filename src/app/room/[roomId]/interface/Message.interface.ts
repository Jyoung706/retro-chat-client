export interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  message: string;
  isSystem: boolean;
}

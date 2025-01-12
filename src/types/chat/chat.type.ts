export interface ChatRoom {
  _id: string;
  creator_id: string;
  room_name: string;
  participants: {
    user: string;
    joinedAt: string;
  }[];
  isPublic: boolean;
}

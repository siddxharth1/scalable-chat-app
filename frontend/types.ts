export type ChatGroupType = {
  id: string;
  user_id: number;
  title: string;
  passcode: string;
  created_at: string;
  users_count?: number; // added from backend aggregation
};

export type GroupChatUserType = {
  id: number;
  name: string;
  group_id: string;
  created_at: string;
  isOnline?: boolean;
};

export type MessageType = {
  id: string;
  message: string;
  group_id: string;
  name: string;
  created_at: string;
  user_id?: number; // added for reliable self-identification on client
};

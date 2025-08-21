import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import {
  ChatGroupType,
  GroupChatUserType,
  MessageType,
} from "../../../../types";
import { notFound } from "next/navigation";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchChats } from "@/fetch/ChatsFetch";

const Chat = async ({ params }: { params: { chatId: string } }) => {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (params.chatId.length !== 36) {
    return notFound();
  }

  const chatGroup: ChatGroupType | null = await fetchChatGroup(
    params.chatId,
    session?.user?.token!
  );
  if (chatGroup === null) {
    return notFound();
  }

  const user: Array<GroupChatUserType> | [] = await fetchChatUsers(
    params.chatId
  );

  const chats: Array<MessageType> = await fetchChats(
    params.chatId,
    session?.user?.token!
  );
  return (
    <div>
      {/* {params.chatId} */}
      <ChatBase
        group={chatGroup}
        users={user}
        oldMessages={chats}
        session={session}
      />
    </div>
  );
};

export default Chat;

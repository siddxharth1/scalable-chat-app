"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatSidebar from "./ChatSidebar";
import { ChatGroupType, GroupChatUserType, MessageType } from "../../../types";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

const ChatBase = ({
  group,
  users,
  oldMessages,
  session,
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
  session: any;
}) => {
  const [open, setOpen] = useState(true); // true => show join dialog (if needed)
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  const searchParams = useSearchParams();
  const forceJoin = searchParams?.get("join") === "1";

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      setChatUser(JSON.parse(data));
    }
    const isCreator = session?.user?.id === group.user_id;
    const alreadyJoined = !!data;
    if (forceJoin) {
      setOpen(true);
    } else if (isCreator || alreadyJoined) {
      setOpen(false);
    }
  }, [group.id, session?.user?.id, group.user_id, forceJoin]);

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-900">
      <ChatSidebar users={users} />
      <div className="flex flex-col flex-1">
        {open && (
          <ChatUserDialog
            open={open}
            setOpen={setOpen}
            group={group}
            session={session}
          />
        )}
        {!open && (
          <>
            <ChatNav chatGroup={group} users={users} user={chatUser} />
            <Chats
              group={group}
              chatUser={chatUser}
              oldMessages={oldMessages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBase;

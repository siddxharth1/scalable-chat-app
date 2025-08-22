"use client";
import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo, useState } from "react";
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
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      setChatUser(JSON.parse(data));
    }
  }, [group.id]);

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-900">
      <ChatSidebar users={users} />
      <div className="flex flex-col flex-1">
        {open ? (
          <ChatUserDialog
            open={open}
            setOpen={setOpen}
            group={group}
            session={session}
          />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}
        <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
      </div>
    </div>
  );
};

export default ChatBase;

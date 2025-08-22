import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import { ChatGroupType, GroupChatUserType } from "../../../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("") || "U";
  return (
    <nav className="w-full flex justify-between items-center px-4 h-16 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <MobileChatSidebar users={users} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-800">
            {chatGroup.title}
          </h1>
          <p className="text-[11px] text-slate-400">
            Created {new Date(chatGroup.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">
            {user.name}
          </span>
          <Avatar className="h-8 w-8 text-[11px]">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </nav>
  );
}

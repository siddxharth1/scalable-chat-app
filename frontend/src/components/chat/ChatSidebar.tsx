import React from "react";
import { GroupChatUserType } from "../../../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r bg-slate-50/80 backdrop-blur-sm">
      <div className="px-5 py-4 border-b">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Members
        </h2>
      </div>
      <ul className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-300">
        {users?.map((u) => {
          const initials =
            u.name
              ?.split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("") || "U";
          return (
            <li
              key={u.id}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg bg-white/60 hover:bg-white shadow-sm transition-colors"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 text-[11px]">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {u.name}
                </p>
                <p className="text-[10px] text-slate-400">
                  Joined {new Date(u.created_at).toLocaleDateString()}
                </p>
              </div>
            </li>
          );
        })}
        {users?.length === 0 && (
          <li className="text-xs text-slate-400 text-center py-4">
            No members
          </li>
        )}
      </ul>
    </aside>
  );
}

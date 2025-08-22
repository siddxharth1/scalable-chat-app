import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { ChatGroupType } from "../../../types";
import Link from "next/link";
import Env from "@/lib/env";
import { LockClosedIcon } from "@radix-ui/react-icons";
import JoinAndOpenGroup from "./JoinAndOpenGroup";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-md transition-shadow border-slate-200/70">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5" />
      <CardHeader className="flex-row justify-between items-start space-y-0 relative z-10">
        <div className="space-y-1">
          <Link href={`${Env.APP_URL}/chat/${group.id}`} className="block">
            <CardTitle className="text-lg font-semibold tracking-tight text-slate-800 hover:text-blue-600 transition-colors">
              {group.title}
            </CardTitle>
          </Link>
          <div className="flex items-center gap-3">
            <p className="text-[11px] uppercase tracking-wide font-medium text-slate-400 flex items-center gap-1">
              <LockClosedIcon className="h-3 w-3" /> {group.passcode}
            </p>
            {group.users_count !== undefined && (
              <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {group.users_count} member{group.users_count === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent className="relative z-10 pt-0 space-y-2 text-sm text-slate-600">
        <p className="text-xs text-slate-500">
          Created {new Date(group.created_at).toLocaleDateString()}
        </p>
        <JoinAndOpenGroup group={group} user={user} />
      </CardContent>
    </Card>
  );
}

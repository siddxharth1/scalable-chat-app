import DashNav from "@/components/Dashboard/DashNav";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateChat from "@/components/groupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import { ChatGroupType } from "../../../types";
import GroupChatCard from "@/components/groupChat/GroupChatCard";
import { Input } from "@/components/ui/input";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<ChatGroupType> | [] = await fetchChatGroups(
    session?.user?.token!
  );
  console.log(groups);

  // Simplified dashboard: we only show total groups, per-card member counts.
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image! ?? undefined}
      />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 md:px-10 py-6 space-y-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
                Your Groups
              </h1>
              <p className="text-sm text-slate-500">
                Create or manage group chats.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Input placeholder="Search groups" className="w-56" />
              <CreateChat user={session?.user!} />
            </div>
          </div>
          <div className="rounded-xl border bg-white p-5 flex flex-col w-full sm:w-64">
            <span className="text-xs uppercase tracking-wide text-slate-400 font-medium">
              Total Groups
            </span>
            <span className="mt-2 text-2xl font-semibold">{groups.length}</span>
          </div>
        </div>
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500">All Groups</h2>
          {groups.length === 0 ? (
            <div className="rounded-xl border border-dashed p-16 text-center bg-white/50">
              <p className="text-slate-500 mb-4">No groups yet.</p>
              <CreateChat user={session?.user!} />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groups.map((item, index) => (
                <GroupChatCard group={item} key={index} user={session?.user!} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

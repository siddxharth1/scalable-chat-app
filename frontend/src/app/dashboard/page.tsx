import DashNav from "@/components/Dashboard/DashNav";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateChat from "@/components/groupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import { ChatGroupType } from "../../../types";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<ChatGroupType> | [] = await fetchChatGroups(
    session?.user?.token!
  );
  console.log(groups);

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image! ?? undefined}
      />
      <div className="container">
        <div className="mx-8">
          <div className="mt-6 text-end">
            <CreateChat user={session?.user!} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.length > 0 &&
              groups.map((item, index) => (
                <GroupChatCard group={item} key={index} user={session?.user!} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

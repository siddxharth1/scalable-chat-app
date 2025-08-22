"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import EditGroupChat from "./EditGroupChat";
import { toast } from "sonner";
import Env from "@/lib/env";
import { ChatGroupType } from "../../../types";
const DeleteChatGroup = dynamic(() => import("./DeleteChatGroup"));

export default function GroupChatCardMenu({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialoag, setEditDialog] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/chat/${group.id}`);
    toast.success("Link copied successfully!");
  };

  return (
    <>
      {deleteDialog && (
        <Suspense fallback={<p>Loading...</p>}>
          <DeleteChatGroup
            open={deleteDialog}
            setOpen={setDeleteDialog}
            groupId={group.id}
            token={user.token!}
          />
        </Suspense>
      )}
      {editDialoag && (
        <Suspense fallback={<p>Loading...</p>}>
          <EditGroupChat
            open={editDialoag}
            setOpen={setEditDialog}
            user={user}
            group={group}
          />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full p-1.5 hover:bg-slate-100 transition-colors">
          <DotsVerticalIcon className="h-5 w-5 text-slate-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setEditDialog(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialog(true)}
            className="text-red-600 focus:text-red-600 cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

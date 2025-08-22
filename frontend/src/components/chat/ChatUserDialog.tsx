"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USER_URL } from "@/lib/ApiEndPoint";
import { toast } from "sonner";
import { ChatGroupType } from "../../../types";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default function ChatUserDialog({
  open,
  setOpen,
  group,
  session,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: ChatGroupType;
  session: CustomSession;
}) {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });

  useEffect(() => {
    // If the logged-in user created the group, auto close dialog (no need for name/passcode)
    const sessionUserIdNum = Number(session?.user?.id);
    if (!isNaN(sessionUserIdNum) && sessionUserIdNum === group.user_id) {
      setOpen(false);
      return;
    }
    const data = localStorage.getItem(params["chatId"] as string);
    if (data) {
      try {
        const jsonData = JSON.parse(data);
        if (jsonData?.name && jsonData?.group_id) {
          setOpen(false); // already joined
        }
      } catch {}
    }
  }, [group.user_id, session?.user?.id, params, setOpen]);
  console.log("session", session);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const localData = localStorage.getItem(params["chatId"] as string);
    const sessionUserIdNum = Number(session?.user?.id);
    if (!isNaN(sessionUserIdNum) && sessionUserIdNum === group.user_id) {
      // creator doesn't need to join via passcode
      setOpen(false);
      return;
    }
    if (!localData) {
      try {
        const { data } = await axios.post(
          CHAT_GROUP_USER_URL,
          {
            name: state.name,
            group_id: params["chatId"] as string,
            passcode: state.passcode, // Pass passcode to backend
            // headers: {
            //   Authorization: session?.user?.token!,
            // },
          },
          {
            headers: {
              Authorization: session?.user?.token!,
            },
          }
        );

        // Store data locally
        localStorage.setItem(
          params["chatId"] as string,
          JSON.stringify(data?.data)
        );
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join this group</DialogTitle>
          <DialogDescription>
            Enter a display name and the group passcode to join.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Enter your passcode"
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

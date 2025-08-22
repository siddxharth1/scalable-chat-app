"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP_USER_URL } from "@/lib/ApiEndPoint";
import { toast } from "sonner";
import { ChatGroupType } from "../../../types";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  group: ChatGroupType;
  user: CustomUser;
  className?: string;
}

export default function JoinAndOpenGroup({ group, user, className }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);

  // If already joined (localStorage), skip dialog
  const alreadyJoined =
    typeof window !== "undefined" && !!localStorage.getItem(group.id);

  const handleClick = () => {
    if (user?.id && Number(user.id) === group.user_id) {
      // creator: direct access
      router.push(`/chat/${group.id}?join=1`);
      return;
    }
    if (alreadyJoined) {
      router.push(`/chat/${group.id}`);
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axios.post(
        CHAT_GROUP_USER_URL,
        {
          name: user?.name || "User",
          group_id: group.id,
          passcode: passcode,
        },
        {
          headers: {
            Authorization: user?.token || "",
          },
        }
      );
      localStorage.setItem(group.id, JSON.stringify(data?.data));
      toast.success("Joined group");
      setOpen(false);
      router.push(`/chat/${group.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Failed to join group");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleClick}
        className={className}
      >
        Open Chat
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Enter Passcode</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Group passcode"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Joining..." : "Join & Enter"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

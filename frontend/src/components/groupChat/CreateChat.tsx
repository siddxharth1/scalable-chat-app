"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/GroupChatValidation";
import { Input } from "../ui/input";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CHAT_GROUP_URL } from "@/lib/ApiEndPoint";

const CreateChat = ({ user }: { user: CustomUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmitHandler = async (payload: createChatSchemaType) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        CHAT_GROUP_URL,
        {
          ...payload,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (data?.message) {
        setLoading(false);
        setOpen(false);
        toast.success(data?.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new chat</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-3"
        >
          <div>
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-500">{errors?.title?.message}</span>
          </div>
          <div>
            <Input
              type="password"
              placeholder="Enter chat passcode"
              {...register("passcode")}
            />
            <span className="text-red-500">{errors?.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;

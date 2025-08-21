"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const loginHandle = () => {
    signIn("google", { callbackUrl: "/dashboard", redirect: true });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting start</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>welcome</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ipsa
            officia molestiae? Possimus recusandae pariatur voluptas, esse
            facere provident?
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={loginHandle}>
          G continue with google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

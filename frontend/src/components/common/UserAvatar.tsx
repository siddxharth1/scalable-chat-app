import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ name, image }: { name: string; image?: string }) => {
  return (
    <Avatar>
      <AvatarImage src={image || "https://github.com/shadcn.png"} />
      <AvatarFallback>{name[0] || "name"}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

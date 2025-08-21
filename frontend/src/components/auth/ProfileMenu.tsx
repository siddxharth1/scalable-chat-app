"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import("./LogoutModal"));

const ProfileMenu = ({ name, image }: { name: string; image?: string }) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <>
      {logoutOpen && (
        <Suspense fallback="loading">
          <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />
        </Suspense>
      )}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar name={name} image={image} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setLogoutOpen(true);
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ProfileMenu;

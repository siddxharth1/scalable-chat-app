import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5">
      <p>404 page not found. </p>
      <Link href="/">
        <Button> go to home page</Button>
      </Link>
    </div>
  );
};

export default NotFound;

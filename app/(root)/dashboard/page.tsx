import SignInOrUpForm from "@/components/shared/SignInOrUpForm";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default async function Page() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" appearance={{}} />
    </div>
  );
}

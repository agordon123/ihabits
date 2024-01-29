import { UserButton, auth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";
interface PageProps {}
export default async function Page() {
  const { userId: clerkId } = auth();
  return (
    <div>
      <UserButton afterSignOutUrl="/" appearance={{ baseTheme: dark }} />
    </div>
  );
}

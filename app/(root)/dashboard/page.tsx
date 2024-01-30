import { getUser, getUserInfo } from "@/lib/actions/users.actions";
import { UserButton, auth, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import React from "react";
interface PageProps {}
export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserInfo({ userId });

  return (
    <div>
      <h1 className="h1-bold">Welcome {JSON.stringify(mongoUser.name)}</h1>
    </div>
  );
}

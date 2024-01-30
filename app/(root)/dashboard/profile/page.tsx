import { getUser } from "@/lib/actions/users.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUser(clerkId);
  }
  return <div>Welcome {mongoUser}</div>;
};

export default Page;

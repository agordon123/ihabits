import TaskForm from "@/components/forms/TaskForm";
import { getUserInfo } from "@/lib/actions/users.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();
  const user = await getUserInfo({ userId });
  return (
    <div>
      <TaskForm user={user} />
    </div>
  );
};

export default Page;

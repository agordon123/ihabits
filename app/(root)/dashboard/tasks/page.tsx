import { ITask } from "@/database/models/task.model";
import React from "react";
import { getAllTasks } from "@/lib/actions/tasks.actions";
import { auth } from "@clerk/nextjs";
import { getUserById, getUserWithTasks } from "@/lib/actions/users.actions";
interface PageProps {
  userId: string;
}
const Page = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const userWithTasks = await getUserWithTasks({ userId });
  if (!userWithTasks) return null;
  return <>{userId}</>;
};

export default Page;

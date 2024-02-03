import TaskCard from "@/components/cards/TaskCard";
import { IUser } from "@/database/models/user.model";
import { ITask } from "@/database/models/task.model";
import { getUserWithTasks } from "@/lib/actions/users.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser: IUser = await getUserWithTasks({ userId });

  return (
    <div className="flex background-light800_dark400 text-dark400_light900">
      <h1 className="h1-bold">Welcome {JSON.stringify(mongoUser.name)}</h1>
      <div className="mx-auto p-5 gap-3">
        {mongoUser && <TaskCard user={mongoUser} />}
      </div>
    </div>
  );
}

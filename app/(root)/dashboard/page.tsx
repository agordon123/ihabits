import TaskCard from "@/components/cards/TaskCard";
import { CalendarCard } from "@/components/cards/NylasCard";
import { IUser } from "@/database/models/user.model";
import { getUserWithTasks } from "@/lib/actions/users.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser: IUser = await getUserWithTasks({ userId });

  return (
    <div className="background-light800_dark300 text-dark200_light900 flex  min-w-full flex-col justify-center align-middle">
      <div className="mx-auto">
        <h1 className="h1-bold">Welcome {JSON.stringify(mongoUser.name)}</h1>
      </div>
      <div className="flex">
        <div className="gap-3 p-5">
          {mongoUser && <TaskCard user={mongoUser} />}
          {mongoUser && <CalendarCard email={mongoUser.email} />}
        </div>
      </div>
    </div>
  );
}

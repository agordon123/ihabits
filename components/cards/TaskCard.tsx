import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "../ui/checkbox";
import { ITask } from "@/database/models/task.model";
import { IUser } from "@/database/models/user.model";
import { getAllTasks } from "@/lib/actions/tasks.actions";

interface Props {
  user: IUser;
  tasks?: {
    _id: string;
    userId: string;
    title: string;
    dueDate: Date | null;
    completed: boolean;
    description?: string;
  }[];
}

async function TaskCard({ tasks, user }: Props) {
  let userTasks;
  const fetchedUserTasks = await getAllTasks(user.clerkId);
  if (fetchedUserTasks) {
    userTasks = fetchedUserTasks;
  } else {
    userTasks = [];
  }

  const parsedTasks: ITask[] = JSON.parse(JSON.stringify(userTasks));

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Tasks </CardTitle>
          <CardDescription>Upcoming Tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {parsedTasks.length > 0 && parsedTasks.length <= 3 ? (
            parsedTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                  </div>
                </div>
                <Link href={`/tasks/${task._id}`}>
                  <a className="paragraph-semibold">View</a>
                </Link>
              </div>
            ))
          ) : (
            <>
              {" "}
              <p>No tasks found</p>
              <CardFooter className="flex justify-between">
                <Link href="/tasks">
                  <Button>View All</Button>
                </Link>
                <Link href="/tasks/new">
                  <Button>Create</Button>
                </Link>
              </CardFooter>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default TaskCard;

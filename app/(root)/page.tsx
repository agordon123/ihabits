import TaskCard from "@/components/cards/TaskCard";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/users.actions";
import { auth, useUser } from "@clerk/nextjs";

export default async function Home() {
  const { userId: clerkId } = auth();

  return (
    <div className="flex background-dark500_light500 min-h-[100%] min-w-[100%]">
      <h1 className="h1-bold">Welcome to iHabits, for ADHDers by ADHDers</h1>
      <div className="flex-col">
        <div className="mt-10 justify-center items-center">
          {/* <TaskCard user={user} /> */}
        </div>
      </div>
    </div>
  );
}

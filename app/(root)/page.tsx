import TaskCard from "@/components/cards/TaskCard";
import { Button } from "@/components/ui/button";
import { getUser, getUserInfo } from "@/lib/actions/users.actions";
import { auth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserInfo({ userId });
  if (mongoUser) {
    redirect("/dashboard");
  }
  return (
    <div className="container flex  text-dark400_light900  min-h-[100%] min-w-[100%]">
      <h1 className="h1-bold">Welcome to iHabits, for ADHDers by ADHDers</h1>
      <div className="flex-col">
        <div className="mt-10 justify-center items-center">
          {/* <TaskCard user={user} /> */}
        </div>
      </div>
    </div>
  );
}

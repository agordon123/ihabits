/* eslint-disable no-unused-vars */
import { auth } from "@clerk/nextjs";
import { getUserWithTasks } from "@/lib/actions/users.actions";
interface PageProps {
  userId: string;
}
const Page = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const userWithTasks = await getUserWithTasks({ userId });
  if (!userWithTasks) return null;
  return (
    <div className="background-light800_dark400 text-dark400_light800">
      {userId}
    </div>
  );
};

export default Page;

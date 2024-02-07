import UserProfile from "@/components/forms/UserProfile";
import { auth } from "@clerk/nextjs";
import { getUserWithTasks } from "@/lib/actions/users.actions";

export const Page = async ({ params }: { params: string }) => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (!clerkId) {
    return <div>Not Found</div>;
  } else {
    mongoUser = await getUserWithTasks({ userId: clerkId });
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="flex flex-col">
        <UserProfile user={JSON.parse(JSON.stringify(mongoUser!))} />
      </div>
    </>
  );
};

export default Page;

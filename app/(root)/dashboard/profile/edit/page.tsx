import ProfileCard from "@/components/cards/ProfileCard";
import UserProfile from "@/components/forms/UserProfile";
import { IUser } from "@/database/models/user.model";
import { getUserInfo } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser: IUser = await getUserInfo({ userId });
  if (!mongoUser) return null;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        {userId && (
          <ProfileCard
            clerkId={userId}
            user={JSON.parse(JSON.stringify(mongoUser!))}
          />
        )}
      </div>
      <div>
        {userId && (
          <UserProfile user={JSON.parse(JSON.stringify(mongoUser!))} />
        )}
      </div>
    </>
  );
};

export default Page;

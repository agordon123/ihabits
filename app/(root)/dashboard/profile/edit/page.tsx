import ProfileCard from "@/components/cards/ProfileCard";
import UserProfile from "@/components/forms/UserProfile";
import { IUser } from "@/database/models/user.model";
import { getUserInfo } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import React from "react";

interface Props {
  clerkId: string;
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
    googleId?: string;
    appleId?: string;
  };
}

const Page = async ({ user }: Props) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser: IUser = await getUserInfo({ userId });
  if (!mongoUser) return null;
  if (!user) {
    console.log(mongoUser);
    try {
      const response = await fetch(`http://localhost:3000/api/users/`);
      const user = await response.json();
      console.log(user);
    } catch (error) {}
  }
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        {userId && <ProfileCard clerkId={userId} user={user} />}
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

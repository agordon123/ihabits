import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserInfo } from "@/lib/actions/users.actions";

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
    nylasInfo?: {
      accessToken: string;
      accountId: string;
      email: string;
    }[];
  };
}
const ProfileCard = async ({ user, clerkId }: Props) => {
  const mongoUser = await getUserInfo({ userId: clerkId });
  if (typeof mongoUser === "string") {
    user = JSON.parse(mongoUser);
  }
  if (!clerkId) {
    return null;
  }
  return (
    <Link
      href={`/profile/${mongoUser._id}`}
      className="card-wrapper shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={mongoUser.picture}
          width={100}
          height={100}
          alt="profilepicture"
          className="rounded-xl"
        />
        <div className="mt-4  text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {mongoUser.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            {mongoUser.username}
          </p>
        </div>
        <div className="mt-5">
          {user.nylasInfo?.length === 0 ? (
            <p className="body-regular text-dark500_light500 mt-2">
              Connect Nylas
            </p>
          ) : (
            user.nylasInfo?.map((val, id) => val.accountId)
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProfileCard;

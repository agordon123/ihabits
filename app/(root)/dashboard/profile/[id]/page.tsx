import { getUserInfo } from "@/lib/actions/users.actions";
import { SignedIn, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = async () => {
  const { userId: clerkId } = auth();
  const user = await currentUser();
  const userInfo = await getUserInfo({ userId: clerkId });
  if (!user || !userInfo) {
    console.log(user);
    console.log("profile id page line 17");
    console.log(userInfo);
  }
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-xl object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo?.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo?.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5"></div>
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo?.clerkId && (
              <Link href={`/dashboard/profile/edit`}>
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
    </>
  );
};

export default Page;

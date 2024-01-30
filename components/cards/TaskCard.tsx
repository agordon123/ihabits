import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}
const TaskCard = ({ user }: Props) => {
  return (
    <Link href={`/dashboard/${user._id}/tasks`}>
      <article className="background-light800_dark400  light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          width={100}
          height={100}
          alt="profilepicture"
          className="rounded-full"
        />
        <div className="mt-4  text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            {user.username}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default TaskCard;

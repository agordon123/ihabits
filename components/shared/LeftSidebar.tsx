"use client";
import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  auth,
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
  useUser,
  WithUser,
} from "@clerk/nextjs";
import { getUser } from "@/lib/actions/users.actions";
import { IUser } from "@/database/models/user.model";
interface Props {
  clerkId?: string;
  _id: string;
}
const LeftSidebar = ({ clerkId, _id }: Props) => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const handleOnClick = async () => {};
  useEffect(() => {
    const userCheck = async () => {
      if (!userId) {
        return;
      } else {
        setLoggedIn(true);
      }
    };
    if (pathname === "/dashboard") {
      userCheck();
      if (!loggedIn) {
        router.push("/sign-in");
      }
    }
  }, [loggedIn, pathname, router, userId]);
  return (
    <section className="custom-scrollbar bg-dark-500 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-8 shadow-light-300 dark:shadow-none max-sm:hidden xl:w-[266px]">
      <div className="mt-20">
        <Link href={`/`}>
          <Image
            className="object-contain"
            src={"/images/site-logo.png"}
            width={200}
            height={200}
            alt={"logo"}
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 mt-10">
        {navLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.route}
              className={`${
                isActive
                  ? " rounded-lg text-light-900 dark:text-light-800 border-light-700"
                  : "text-dark500_light900 background-light800_darkgradient"
              }
              
                : flex items-center justify-start gap-4 bg-transparent p-4 text-light-900`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export { LeftSidebar };

export default LeftSidebar;

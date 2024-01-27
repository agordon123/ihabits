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

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const handleOnClick = async () => {};
  useEffect(() => {
    const userCheck = async () => {
      if (!userId) {
        return;
      } else {
        console.log("userId", userId);
      }
    };
    if (pathname === "/dashboard") {
      setLoggedIn(true);
      console.log("pathname", pathname);
      console.log(auth);
    }
  }, [pathname, userId]);
  return (
    <section className="custom-scrollbar bg-dark-500 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-8 shadow-light-300 dark:shadow-none max-sm:hidden xl:w-[266px]">
      <div className="mt-10">
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
                  ? "primary-gradient rounded-lg text-light-900 border-light-700"
                  : "text-dark300_light900"
              }
              
                : flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              {item.name}
            </Link>
          );
        })}
        <UserButton />
      </div>
    </section>
  );
};

export { LeftSidebar };

export default LeftSidebar;

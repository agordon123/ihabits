"use client";
import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar background-light700_dark400 text-dark500_light500  sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-8 shadow-light-300 dark:shadow-none max-sm:hidden xl:w-[266px]">
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

      <div className="mt-10 flex flex-1 flex-col gap-3">
        {navLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          if (item.route === "/dashboard/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              href={item.route}
              key={item.route}
              className={`${
                isActive
                  ? " text-dark500_light500 rounded-lg border-light-700 dark:text-light-800"
                  : "text-dark500_light500 background-light700_dark400"
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

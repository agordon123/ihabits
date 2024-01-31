import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SignIn,
  SignInButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light800_dark400  text-dark500_light700  dark:dark-gradient fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 light-border-2">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/site-logo.png" width={23} height={23} alt="logo" />
        <p className="h2-bold text-dark-100 dark:text-light-900 max-sm:hidden">
          i<span className="text-light-700 dark:text-light-900">Habits</span>
        </p>
      </Link>

      <div className="flex-between gap-5 text-dark500_light700">
        <Theme />
        {<SignedIn /> && (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              baseTheme: dark,
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

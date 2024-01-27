import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/users.actions";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
  auth,
  useAuth,
  SignUp,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-dark-500 min-h-[100%] min-w-[100%] text-light-700">
      <h1 className="h1-bold text-light-100">
        Welcome to iHabits, for ADHDers by ADHDers
      </h1>
      <div className="mt-10 justify-center items-center">
        <SignUpButton />
      </div>

      <Button>
        <SignInButton />
      </Button>
    </div>
  );
}

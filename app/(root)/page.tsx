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
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-dark-500 min-h-[100%] min-w-[100%] text-light-700">
      <Button className="w-[50px] h-[50px]">
        {" "}
        <SignUpButton />
      </Button>{" "}
      Returning?{" "}
      <Button>
        <SignInButton />
      </Button>
    </div>
  );
}

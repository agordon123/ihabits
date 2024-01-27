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
  const { userId } = auth();
  if (userId) {
    const user = getUser(JSON.stringify(userId));
  }

  return (
    <div className="bg-dark-500 min-h-[100%] min-w-[100%] text-light-700">
      <Button className="l-[50px] h-[50px]">
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

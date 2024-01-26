import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navigation";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-primary">
      New? <SignUpButton /> Returning? <SignInButton />
    </div>
  );
}

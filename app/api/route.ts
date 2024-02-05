import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs";
import { connectNylas } from "@/lib/actions/general.actions";
export async function POST() {
  const { userId } = auth();

  if (!userId) return NextResponse.redirect("/sign-in");
  const nylas = await connectNylas();

  const params = { firstName: "John", lastName: "Wick" };

  const user = await clerkClient.users.updateUser(userId, params);
  console.log(user, "user");
  return NextResponse.json({ user });
}

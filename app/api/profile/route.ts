import { connectToDb } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

import { getUserInfo } from "@/lib/actions/users.actions";
export async function GET(req: NextRequest) {
  try {
    connectToDb();
    const { userId } = await req.json();
    const user = await getUserInfo(userId);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

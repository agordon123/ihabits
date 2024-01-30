import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.body;
  return NextResponse.redirect("/dashboard");
}
export async function GET(req: NextRequest) {}

/* eslint-disable camelcase */
import { NextRequest, NextResponse } from "next/server";
import nylas, { config } from "@/lib/nylas";
import { auth } from "@clerk/nextjs";
import { getUserInfo } from "@/lib/actions/users.actions";
import User from "@/database/models/user.model";

export async function POST(req: NextRequest & { query: { code: string } }) {
  const client_id = process.env.NYLAS_CLIENT_ID;
  const client_secret = process.env.NYLAS_CLIENT_SECRET;
  const code = req.query.code;
  if (!code) return new NextResponse("No code provided", { status: 400 });

  const fetchResponse = await fetch(
    `https://api.nylas.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return fetchResponse || new NextResponse();
}

export async function GET(req: NextRequest & { query: { code: string } }) {
  // Assuming you're fetching some data here based on the access token

  const code = req.query.code;

  if (!code) {
    return new NextResponse("No authorization code returned from Nylas", {
      status: 400,
    });
  }
  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: config.clientSecret!,
      clientId: config.clientId ?? "",
      code,
      redirectUri: config.callbackUri!, // Add the redirectUri property with the appropriate value
    });

    const { grantId } = response;
    const { userId } = auth();
    const user = await getUserInfo(userId!);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    } else {
      const updatedUser = User.updateOne(
        { _id: user._id },
        { nylasGrantId: grantId }
      );
      console.log(updatedUser);
    }

    const nextResponse = new NextResponse(JSON.stringify({ grantId }), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return nextResponse;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    const nextResponse = new NextResponse(
      "Failed to exchange authorization code for token",
      {
        status: 500,
      }
    );

    return nextResponse;
  }
}

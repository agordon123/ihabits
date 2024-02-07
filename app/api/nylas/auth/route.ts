import nylas, { config } from "@/lib/nylas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await req.body;
    const authUrl: string = nylas.auth.urlForOAuth2({
      clientId: config.clientId!,
      provider: "google",
      redirectUri: config.callbackUri!,
      loginHint: "<USER_EMAIL>",
      scope: ["email"],
    });

    return NextResponse.redirect(authUrl, { status: 302 });
  } catch (error) {
    console.log(error);
  }
}

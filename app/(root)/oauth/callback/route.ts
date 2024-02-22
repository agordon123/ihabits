import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import Nylas from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY || "",
  apiUri: "https://api.us.nylas.com",
});

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request & NextRequest) {
  const cookieStore = cookies();
  const secret = cookieStore.get("nylas_code_challenge")?.value;
  console.log(secret);
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code") as string;
  console.log(code);
  const { grantId } = await nylas.auth.exchangeCodeForToken({
    clientSecret: process.env.NYLAS_API_URI,
    clientId: process.env.NYLAS_CLIENT_ID!,
    code,
    redirectUri: "http://localhost:3000/oauth/callback",
    // @ts-ignore
    codeVerifier: secret,
  });

  cookieStore.set("nylas_user_grant_id", grantId);
  console.log({ grantId });
  // return Response.json({ grantId })
  return Response.redirect("http://localhost:3000");
}

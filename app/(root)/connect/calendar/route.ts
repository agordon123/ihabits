import { cookies } from "next/headers";
import Nylas from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY!,
  apiUri: process.env.NYLAS_API_URI!,
});

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const cookieStore = cookies();

  const data = nylas.auth.urlForOAuth2PKCE({
    clientId: process.env.NYLAS_CLIENT_ID!,
    provider: "google",
    redirectUri: "http://localhost:3000/oauth/callback",
    loginHint: "adamg42685@gmail.com",
  });

  cookieStore.set("nylas_code_challenge", data.secretHash);

  return Response.redirect(data.url);
}

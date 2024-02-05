/* eslint-disable camelcase */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest & { query: { code: string } }) {
  const client_id = process.env.NYLAS_CLIENT_ID;
  const client_secret = process.env.NYLAS_CLIENT_SECRET;
  const code = req.query.code;

  const fetchResponse = await fetch(
    `https://api.nylas.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((userData) => {
      const email = userData.email_address;
      const accessToken = userData.access_token;
      return new NextResponse(JSON.stringify({ email, accessToken }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
    .catch((error) => console.log("error", error));

  return fetchResponse || new NextResponse();
}

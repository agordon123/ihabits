import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest, _res: NextResponse<unknown>) {
  try {
    const { body } = await req.json();
    console.log("==========Message updated start==========");
    body.deltas.forEach((delta: any) => console.log(JSON.stringify(delta)));
    console.log("==========Message updated end==========\n");
    // Acknowledge the webhook to prevent retries

    console.log("Webhook received:", body);

    // Respond to acknowledge receipt of the webhook event
    return NextResponse.json({ message: "OK", data: body });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", data: error });
  }
  // If not a POST request, indicate the method is not allowed
}
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { challenge } = await req.query;
  console.log(`Received challenge code! - ${challenge}`);
  console.log(`Now returning challenge code! - ${req.query.challenge}`);
  // Respond with the challenge parameter to verify the webhook

  res.setHeader("Allow", ["POST"]);

  return NextResponse.json(req.query.challenge as string);
}

import {  NextResponse } from "next/server";


export async function POST(req, res) {
  try {
    const { body } = await req.json();
    console.log("==========Message updated start==========");
    body.deltas.forEach((delta) => console.log(JSON.stringify(delta)));
    console.log("==========Message updated end==========\n");
    // Acknowledge the webhook to prevent retries

    console.log("Webhook received:", body);

    // Respond to acknowledge receipt of the webhook event
    res.status(200).send("Webhook received");
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", data: error });
  }
}
  // If not a POST request, indicate the method is not allowed

  export async function GET(req, res) {
    const { challenge } = await req.query;
    console.log(`Received challenge code! - ${challenge}`);
    console.log(`Now returning challenge code! - ${req.query.challenge}`);
    // Respond with the challenge parameter to verify the webhook

    res.setHeader("Allow", ["POST"]);

    return NextResponse.json(req.query.challenge);
  }


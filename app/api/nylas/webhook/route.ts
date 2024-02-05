import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse<unknown>) {
  try {
    // Here, you would handle the incoming webhook data
    console.log("Webhook received:", req.body);

    // Respond to acknowledge receipt of the webhook event
    return NextResponse.json({ message: "OK", data: req.body });
  } catch (error) {}
  // If not a POST request, indicate the method is not allowed
}

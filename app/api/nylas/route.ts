import {
  createGoogleConnector,
  createWebhook,
} from "@/lib/actions/nylas.actions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const email = await req.json();
    await createGoogleConnector();
    await createWebhook(email);
  } catch (error) {
    console.log(error);
  }
}

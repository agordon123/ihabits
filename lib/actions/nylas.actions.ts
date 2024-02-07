import { auth } from "@clerk/nextjs";
import nylas from "../nylas";
import { WebhookTriggers } from "nylas/lib/types/models/webhooks";

export const createCalendar = async () => {
  let newCalendar;
  try {
    const { userId } = auth();
    newCalendar = await nylas.calendars.create({
      identifier: userId!,
      requestBody: {
        name: "",
      },
    });
    if (newCalendar) {
      console.log(newCalendar.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export async function getApplicationDetails() {
  const applicationDetails = await nylas.applications.getDetails();
  console.log(applicationDetails);
  return applicationDetails;
}

export const createConnector = async () => {
  const connector = await nylas.connectors.create({
    requestBody: {
      name: "Google Connector", // Add the name property
      provider: "google", // Add the provider property
      settings: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      scope: [
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/contacts",
      ],
    },
  });
  return connector;
};

export const createWebhook = async () => {
  try {
    const webhook = await nylas.webhooks.create({
      requestBody: {
        triggerTypes: [
          WebhookTriggers.EventCreated,
          WebhookTriggers.CalendarCreated,
          WebhookTriggers.CalendarCreated,
          WebhookTriggers.CalendarUpdated,
          WebhookTriggers.GrantCreated,
          WebhookTriggers.GrantCreated,
          WebhookTriggers.GrantUpdated,
          WebhookTriggers.EventDeleted,
          WebhookTriggers.EventUpdated,
        ],
        callbackUrl:
          "http://localhost:3000/api/nylas/webhook" ||
          "https://ihabits.vercel.app/api/nylas/webhook",
        description: "My first webhook",
        notificationEmailAddress: "adamgordon119@gmail.com",
      },
    });

    console.log("Webhook created:", webhook);
  } catch (error) {
    console.error("Error creating webhook:", error);
  }
};
export async function fetchAllCalendars(): Promise<void> {
  try {
    const calendars = await nylas.calendars.list({
      identifier: "<GRANT_ID>",
    });

    console.log("Available Calendars:", calendars);
  } catch (error) {
    console.error("Error fetching calendars:", error);
  }
}

export async function fetchAllEventsFromCalendar(): Promise<void> {
  try {
    const events = await nylas.events.list({
      identifier: "<GRANT_ID>",
      queryParams: {
        calendarId: "<CALENDAR_ID>",
      },
    });

    console.log("Events:", events);
  } catch (error) {
    console.error("Error fetching calendars:", error);
  }
}

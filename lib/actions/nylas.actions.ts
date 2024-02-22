import { auth } from "@clerk/nextjs";
import { nylas } from "../constants";
import { WebhookTriggers } from "nylas/lib/types/models/webhooks";
export const createWebhook = async () => {
  try {
    const webhook = await nylas.webhooks.create({
      requestBody: {
        callbackUrl: "https://ihabits.vercel.app/api/nylas/webhook",
        description: "My first webhook",
        notificationEmailAddress: "adamg42685@gmail.com",
        triggerTypes: [
          WebhookTriggers.CalendarCreated,
          WebhookTriggers.CalendarUpdated,
          WebhookTriggers.CalendarDeleted,
          WebhookTriggers.GrantCreated,
          WebhookTriggers.GrantDeleted,
          WebhookTriggers.GrantUpdated,
          WebhookTriggers.GrantExpired,
          WebhookTriggers.EventCreated,
          WebhookTriggers.EventUpdated,
          WebhookTriggers.EventDeleted,
        ],
      },
    });

    console.log("Webhook created:", webhook);
  } catch (error) {
    console.error("Error creating webhook:", error);
  }
};

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

export const createGoogleConnector = async () => {
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
  console.log(connector);
  return connector;
};

export async function fetchAllCalendars({
  grantId,
}: {
  grantId: string;
}): Promise<void> {
  try {
    const calendars = await nylas.calendars.list({
      identifier: grantId!,
    });

    console.log("Available Calendars:", calendars);
  } catch (error) {
    console.error("Error fetching calendars:", error);
  }
}

export async function fetchAllEventsFromCalendar({
  grantId,
  calendarId,
}: {
  grantId: string;
  calendarId: string;
}): Promise<void> {
  try {
    const events = await nylas.events.list({
      identifier: grantId,
      queryParams: {
        calendarId,
      },
    });

    console.log("Events:", events);
  } catch (error) {
    console.error("Error fetching calendars:", error);
  }
}
export async function oauthGoogle() {}

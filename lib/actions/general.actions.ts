"use server";
import Nylas from "nylas";
import { WebhookTriggers } from "nylas/lib/models/webhook";
import { openWebhookTunnel } from "nylas/lib/services/tunnel";
import nylas from "../nylas";
export const connectNylas = () => {
  Nylas.config({
    clientId: process.env.NYLAS_CLIENT_ID!,
    clientSecret: process.env.NYLAS_CLIENT_SECRET!,
    apiServer: process.env.NYLAS_API_SERVER,
  });
  const CLIENT_URI =
    process.env.CLIENT_URI || `http://localhost:${process.env.PORT || 3000}`;
  Nylas.application({
    redirectUris: [CLIENT_URI],
  }).then((applicationDetails) => {
    console.log(
      "Application registered. Application Details: ",
      JSON.stringify(applicationDetails)
    );
  });
  // Start the Nylas webhook
  openWebhookTunnel({
    // Handle when a new message is created (sent)
    onMessage: function handleEvent(delta: any) {
      switch (delta.type) {
        case WebhookTriggers.EventCreated:
          console.log(
            "Webhook trigger received, event created. Details: ",
            JSON.stringify(delta.objectData, undefined, 2)
          );
          break;
      }
    },
  }).then((webhookDetails) => {
    console.log("Webhook tunnel registered. Webhook ID: " + webhookDetails.id);
  });
};

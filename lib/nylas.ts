import Nylas from "nylas";
import EventCreated from "nylas/lib/models/webhook";
Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID!,
  clientSecret: process.env.NYLAS_CLIENT_SECRET!,
  apiServer: process.env.NYLAS_API_SERVER,
});

const CLIENT_URI =
  process.env.CLIENT_URI || `http://localhost:${process.env.PORT || 3000}`;
const nylas = Nylas.application({
  applicationName: "IHabits",
  iconUrl: "https://ihabits.vercel.app/favicon.ico",
  redirectUris: [CLIENT_URI],
}).then((applicationDetails) => {
  console.log(
    "Application registered. Application Details: ",
    JSON.stringify(applicationDetails)
  );
});
const createWebhook = async () => {
  try {
    const webhook = Nylas.webhooks.build({
      requestBody: {
        triggerTypes: [EventCreated],
        callbackUrl: process.env.CALLBACK_URL,
        description: "My first webhook",
        notificationEmailAddress: process.env.EMAIL,
      },
    });

    console.log("Webhook created:", webhook);
  } catch (error) {
    console.error("Error creating webhook:", error);
  }
};

createWebhook();
export default nylas;

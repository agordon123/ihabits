import Nylas from "nylas";

export const config = {
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET,
  callbackUri:
    "http://localhost:3000/api/nylas/callback" ||
    "http://ihabits.vercel.app/api/nylas/callback",
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};
const nylas = new Nylas({
  apiKey: config.apiKey!, // Required to make API calls.
  apiUri: config.apiUri, // Required to make API calls.
});

export default nylas;

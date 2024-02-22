import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.DB_URL) {
    return console.log("uri missing");
  }
  if (isConnected) {
    return console.log("already connected");
  }
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "ihabits",
    });
    isConnected = true;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

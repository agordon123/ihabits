import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  console.log(process.env.MONGO_DB_URI);
  if (!process.env.MONGO_DB_URI) {
    return console.log("uri missing");
  }
  if (isConnected) {
    return console.log("already connected");
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, { dbName: "ihabits" });
    isConnected = true;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
  provider?: string;
  googleId?: string;
  githubId?: string;
  appleId?: string;
  habits?: Schema.Types.ObjectId[];
  tasks?: Schema.Types.ObjectId[];
  journalEntries?: Schema.Types.ObjectId[];
  events?: Schema.Types.ObjectId[];
  nylasInfo?: Schema.Types.ObjectId;
}

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  picture: { type: String, required: false },
  name: { type: String, required: false },
  username: { type: String, required: false },
  // Correctly reference other collections
  habits: [{ type: Schema.Types.ObjectId, ref: "Habit" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  journalEntries: [{ type: Schema.Types.ObjectId, ref: "JournalEntry" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  provider: { type: String, required: false },
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  nylasInfo: { type: Schema.Types.ObjectId, ref: "NylasInfo" },
  // If you have a NylasInfo collection, ensure it's referenced correctly
});

export const User = models.User || model("User", userSchema);

export default User;

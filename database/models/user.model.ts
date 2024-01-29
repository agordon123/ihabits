import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  provider?: string;
  googleId?: string;
  githubId?: string;
  appleId?: string;
  habits?: Schema.Types.ObjectId;
  tasks?: Schema.Types.ObjectId;
  journalEntries?: Schema.Types.ObjectId;
  events?: Schema.Types.ObjectId;
  nylasInfo?: Schema.Types.ObjectId;
}

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  picture: { type: String, required: false },
  name: { type: String, required: false },
  // Reference other collections
  habits: [{ type: String, ref: "Habit" }],
  tasks: [{ type: String, ref: "Task" }],
  journalEntries: [{ type: String, ref: "JournalEntry" }],
  events: [{ type: String, ref: "Event" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  provider: { type: String, required: false },
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  // Reference NylasInfo collection
  nylasInfo: [{ type: String, ref: "NylasInfo" }],
});

export const UserModel = models.User || model<IUser>("User", userSchema);

export default UserModel;

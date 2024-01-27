import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";

export interface IJournalEntry extends Document {
  userId: Schema.Types.ObjectId; // Refers to User
  content: string;
  createdAt: Schema.Types.Date;
}

const journalEntrySchema = new Schema<IJournalEntry>({
  _id: { type: String, default: () => uuid.v4() },
  userId: { type: String, required: true, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const JournalEntry =
  mongoose.model<IJournalEntry>("JournalEntry", journalEntrySchema) ||
  models.JournalEntry;
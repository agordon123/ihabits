import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IJournalEntry extends Document {
  userId: Schema.Types.ObjectId; // Refers to User
  content: string;
  createdAt: Schema.Types.Date;
}

const journalEntrySchema = new Schema<IJournalEntry>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
});

export const JournalEntry =
  mongoose.model("JournalEntry", journalEntrySchema) || models.JournalEntry;

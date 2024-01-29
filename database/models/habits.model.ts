import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";
export interface IHabit extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description?: string;
  reminderTimes: Schema.Types.ObjectId; // Assuming reminders are stored as IDs
  createdAt: Date;
}
const habitSchema = new Schema<IHabit>({
  userId: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: false },
  reminderTimes: [{ type: String, ref: "ReminderTime" }], // Reference to ReminderTime model
  createdAt: { type: Date, default: Date.now },
});

const Habit = mongoose.model("Habit", habitSchema) || models.Habit;

export default Habit;

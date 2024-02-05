import { Schema, models, model, Document } from "mongoose";

export interface IHabit extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description?: string;
  reminderTimes: Schema.Types.ObjectId; // Assuming reminders are stored as IDs
  createdAt: Schema.Types.Date;
}
const habitSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: false },
  reminderTimes: [{ type: String, ref: "ReminderTime" }], // Reference to ReminderTime model
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const Habit = model("Habit", habitSchema) || models.Habit;

export default Habit;

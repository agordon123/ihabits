import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";
export interface IReminderTime extends Document {
  habitId?: Schema.Types.ObjectId; // Refers to Habit
  time: Date;
  eventId?: Schema.Types.ObjectId;
  taskId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

const reminderTimeSchema = new Schema<IReminderTime>({
  habitId: { type: Schema.Types.ObjectId, required: true, ref: "Habit" },
  time: { type: Date, required: true },
  taskId: { type: String, required: true, ref: "Task" },
  userId: { type: String, required: true, ref: "User" },
});

export const ReminderTime =
  model("ReminderTime", reminderTimeSchema) || models.ReminderTime;

export default ReminderTime;

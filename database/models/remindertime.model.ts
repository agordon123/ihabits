import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";
export interface IReminderTime extends Document {
  habitId?: string; // Refers to Habit
  time: Date;
  eventId?: Schema.Types.ObjectId;
  taskId: Schema.Types.ObjectId;
}

const reminderTimeSchema = new Schema<IReminderTime>({
  _id: { type: String, default: () => uuid.v4() },
  habitId: { type: String, required: true, ref: "Habit" },
  time: { type: Date, required: true },
  taskId: { type: String, required: true, ref: "Task" },
});

export const ReminderTime =
  model<IReminderTime>("ReminderTime", reminderTimeSchema) ||
  models.ReminderTime;

export default ReminderTime;

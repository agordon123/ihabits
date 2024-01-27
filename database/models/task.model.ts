import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";
export interface ITask extends Document {
  userId: Schema.Types.ObjectId; // Refers to User
  title: string;
  description?: string;
  dueDate: Schema.Types.Date;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  _id: { type: String, default: () => uuid.v4() },
  userId: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

export const Task = model("Task", taskSchema) || models.Task;

export default Task;
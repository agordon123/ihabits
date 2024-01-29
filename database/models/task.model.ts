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
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Schema.Types.Date, required: true },
  completed: { type: Boolean, default: false },
});

export const Task = model("Task", taskSchema) || models.Task;

export default Task;

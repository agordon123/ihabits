import { Schema, model, models, Document } from "mongoose";

export interface ITask extends Document {
  user: Schema.Types.ObjectId; // Refers to User
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, optional: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

// Check if the model exists before creating it
const Task = models.Task || model<ITask>("Task", taskSchema);

export default Task;

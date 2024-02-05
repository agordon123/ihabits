import { connectToDb } from "@/database/db";
import Task from "@/database/models/task.model";
import { IUser, User } from "@/database/models/user.model"; // Import the User model
import { CreateTaskParams } from "./shared.types";
// Import the connectToDb function

export const createTask = async (params: CreateTaskParams) => {
  try {
    connectToDb();
    const { userId, title, description, dueDate, completed } = params;
    const user: IUser | null = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const task = new Task({
      userId: user._id,
      title,
      description,
      dueDate,
      completed,
    });
    return task;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTasks = async (userId: string) => {
  try {
    connectToDb();
    const tasks = await Task.find({ userId });
    return tasks;
  } catch (error) {
    console.log(error);
  }
};
export const getTasksByObjectId = async (_id: string) => {
  try {
    connectToDb();
    const task = await Task.find({ _id });
    return task;
  } catch (error) {
    console.log(error);
  }
};

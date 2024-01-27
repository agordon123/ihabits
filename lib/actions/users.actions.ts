"use server";

import UserModel from "@/database/models/user.model";
import { CreateUserParams } from "./shared.types";
import { connectToDb } from "@/database/db";
import { revalidatePath } from "next/cache";

export const createUser = async (params: CreateUserParams) => {
  try {
    connectToDb();

    console.log(params, "params");
    const newUser = await UserModel.create(params);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateUser = async (params: any) => {
  try {
    connectToDb();
    const { clerkId } = params;
    const updatedUser = await UserModel.findByIdAndUpdate({ id: clerkId });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteUser = async (params: any) => {
  try {
    connectToDb();
    const { clerkId } = params;
    const deletedUser = await UserModel.findByIdAndDelete({ id: clerkId });
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getUser = async (params: any) => {
  try {
    connectToDb();
    const { clerkId } = params;
    const user = await UserModel.findById({ id: clerkId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

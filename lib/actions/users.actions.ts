"use server";

import UserModel from "@/database/models/user.model";
import { CreateUserParams } from "./shared.types";
import { connectToDb } from "@/database/db";
import { auth, currentUser } from "@clerk/nextjs";

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
    console.log(clerkId);
    const updatedUser = await UserModel.findOneAndUpdate({ clerkId: clerkId });
    return { updatedUser };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteUser = async (params: any) => {
  try {
    connectToDb();
    const { clerkId } = params;
    const deletedUser = await UserModel.findByIdAndDelete({ clerkId: clerkId });
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
    const user = await UserModel.findOne({ clerkId: clerkId });
    console.log(user, "user");
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getUserInfo = async (params: any) => {
  try {
    connectToDb();
    const { userId } = params;

    const user = await UserModel.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {}
};
export const addKeyToUser = async (params: any) => {
  try {
    connectToDb();
    const { clerkId, key } = params;
    const user = await UserModel.findOneAndUpdate(
      { clerkId: clerkId },
      { $push: { keys: key } }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getClerkUser = async (params: any) => {
  try {
    connectToDb();
    const { userId } = auth();
    const user = await currentUser();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

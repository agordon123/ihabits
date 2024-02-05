import * as z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  picture: z.string().url(),
  name: z.string(),
  appleId: z.string().optional(),
  googleId: z.string().optional(),
  username: z.string(),
});
export const ProfileSchema = z.object({
  clerkId: z.string().max(24),
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  email: z.string().email(),
  picture: z.string().url(),
  googleId: z.string().optional(),
  appleId: z.string().optional(),
  nylasId: z.string().optional(),
});
export const TaskSchema = z.object({
  user: z.string().max(24),
  title: z.string().min(5).max(50),
  description: z.string().optional(),
  dueDate: z.date().nullable(),
  completed: z.boolean(),
});
export const NylasAuthSchema = z.object({
  emailToAuthenticate: z.string().email(),
});

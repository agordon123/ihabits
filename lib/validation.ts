import * as z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  picture: z.string().url(),
  name: z.string(),
  appleId: z.string().optional(),
  googleId: z.string().optional(),
  username: z.string(),
});

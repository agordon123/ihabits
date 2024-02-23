import { IUser } from "@/database/models/user.model";
import { WebhookTriggers } from "@/types/webhook"; // Import the missing 'WebhookTriggers' type
export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture?: string;
  provider?: string;
  appleId?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}
// Add roles to the function

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path?: string;
}
export interface DeleteUserParams {
  clerkId: string;
}
export interface CreateTaskParams {
  userId: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
}
export interface GetUserWithTasksParams {
  userId: string;
  limit?: number;
}
export interface CreateWebhookRequest {
  callbackUrl: string;
  description: string;
  notificationEmailAddress: string;
  triggerTypes: WebhookTriggers[];
}

import { NavLink } from "@/types";

export const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
export const clerkSecret = process.env.CLERK_SECRET_KEY;
export const clerkPublishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const navLinks: NavLink[] = [
  { name: "Home", route: "/dashboard", needsAuth: true },
  { name: "Calendar", route: "/dashboard/calendar", needsAuth: true },
  { name: "Tasks", route: "/dashboard/tasks", needsAuth: true },
  { name: "Notes", route: "/dashboard/notes", needsAuth: true },
  { name: "Habits", route: "/dashboard/habits", needsAuth: true },
  { name: "Journal", route: "/dashboard/journal", needsAuth: true },
  { name: "Profile / Edit", route: `/dashboard/profile/edit`, needsAuth: true },
];
export const CLIENT_URI =
  process.env.CLIENT_URI || `http://localhost:${process.env.PORT || 3000}`;

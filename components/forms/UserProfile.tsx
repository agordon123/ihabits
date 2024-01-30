"use client";
import React, { useEffect } from "react";
import { auth } from "@clerk/nextjs";
import * as z from "zod";
import {
  FormControl,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-day-picker";
import { userSchema } from "@/lib/validation";
import { getUser, getUserInfo } from "@/lib/actions/users.actions";
interface Props {
  user: {
    clerkId: string;
    email: string;
    picture: string;
    name: string;
    username: string;
    googleId?: string;
    appleId?: string;
  };
}

const UserProfile = ({ user }: Props) => {
  const { userId: clerkId } = auth();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      picture: "",
      name: "",
      username: "",
      googleId: "",
      appleId: "",
    },
  });
  const onSubmit = () => {};
  useEffect(() => {
    const user = getUserInfo({ clerkId });
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Preferred Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>Real name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>Real name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>Real name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="googleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Calendar Id? (optional) </FormLabel>
                <FormControl>
                  <Input placeholder="Google Auth Id" {...field} />
                </FormControl>
                <FormDescription>Real name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apple API Id ? (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>Real name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default UserProfile;

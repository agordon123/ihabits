"use client";
import React, { useState } from "react";
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
import { Button } from "../ui/button";
import { ProfileSchema } from "@/lib/validation";
import { updateUser } from "@/lib/actions/users.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    email: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserProfile = ({ user }: Props) => {
  const parsedUser = JSON.parse(JSON.stringify(user));
  const userId = parsedUser._id; // Add this line to extract the user ID as a string
  console.log(userId, "38", parsedUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      clerkId: parsedUser.clerkId!,
      email: parsedUser.email!,
      picture: parsedUser.picture!,
      name: parsedUser.name!,
      googleId: parsedUser.googleId || "",
      appleId: parsedUser.appleId || "",
    },
  });
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId: values.clerkId,
        updateData: {
          name: values.name,

          picture: values.picture,
          email: values.email,
          googleId: values.googleId,
          appleId: values.appleId,
        },
        path: pathname,
      });

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="background-light900_dark200 text-dark200_light900 w-full space-y-8 rounded-sm"
        >
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
                <FormLabel>Name *</FormLabel>
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
                <FormLabel>Picture URL</FormLabel>
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
                <FormLabel>Clerk Username</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} disabled />
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
                <FormLabel>Google Calendar Id? - optional </FormLabel>
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
                <FormLabel>Apple API Id ? -Optional</FormLabel>
                <FormControl>
                  <Input placeholder="apple token.." {...field} />
                </FormControl>
                <FormDescription>Apple API Token</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserProfile;

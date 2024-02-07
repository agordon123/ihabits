"use client";
import React, { useEffect, useState, useRef } from "react";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { NylasAuthSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
interface NylasAuthProps {
  email: string;
}
const NylasAuth = ({ email }: NylasAuthProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(email);
  const inputRef = useRef("");
  const form = useForm<z.infer<typeof NylasAuthSchema>>({
    resolver: zodResolver(NylasAuthSchema),
    defaultValues: {
      emailToAuthenticate: email || "",
    },
  });
  const onConnectAccount = async () => {
    const emailToAuthenticate = inputRef.current.valueOf() || userEmail;
    // Nylas Application Client ID
    const CLIENT_ID = process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID!;
    // REDIRECT_URI is our endpoint that Nylas call's with a one-time code to retrieve the access token
    const REDIRECT_URI = "https://localhost:300/api/nylas/callback";
    // Redirect to Nylas’ oauth/authorize endpoint with CLIENT_ID, REDIRECT_URI,
    // and User Email (emailToAuthenticate)
    window.location.pathname = `https://api.nylas.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&login_hint=${emailToAuthenticate}&response_type=code&scopes=calendar.read_only`;
  };
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setUserEmail(email);
    }
  }, [isLoaded, isSignedIn, email]);
  return (
    <>
      <span className="h1-bold text-blue-700">CalSync</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onConnectAccount)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="emailToAuthenticate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            title="Connect Nylas"
            aria-label="Connect Nylas Account"
          />
        </form>
      </Form>
    </>
  );
};

export default NylasAuth;

"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
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

  const form = useForm<z.infer<typeof NylasAuthSchema>>({
    resolver: zodResolver(NylasAuthSchema),
    defaultValues: {
      email: userEmail!,
    },
  });
  const onConnectAccount = async () => {
    await fetch("/api/nylas/auth", {
      method: "GET",
    });
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
          className="text-dark500_light500 space-y-8"
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

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="btn text-dark300_light900 mx-auto size-20 w-[50%] rounded-md bg-blue-500 text-white outline-double"
            type="submit"
            title="Connect Nylas"
            aria-label="Connect Nylas Account"
          >
            Sync Nylas
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NylasAuth;

"use client";
import React from "react";
import { TaskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { auth } from "@clerk/nextjs";
import { Input } from "../ui/input";
interface TaskFormProps {
  user: string;
}
const TaskForm = ({ user }: TaskFormProps) => {
  const { userId } = auth();

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    console.log("values", values);
  }
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      user: userId!,
      title: "",
      dueDate: null,
      completed: false,
      description: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Task Name.." {...field} />
                </FormControl>
                <FormDescription>Preferred Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Task Name.." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input placeholder="Task Name.." {...field} />
                </FormControl>
                <FormDescription>Preferred Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Due Date</FormLabel>
                <FormControl>
                  <Input placeholder="Task Name.." {...field} />
                </FormControl>
                <FormDescription>Preferred Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default TaskForm;

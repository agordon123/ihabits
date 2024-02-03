"use client";
import React from "react";
import { ITask } from "@/database/models/task.model";
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
import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { Input } from "../ui/input";
interface TaskFormProps {
  task: {
    userId: string;
    title: string;
    dueDate: Date | null;
    completed: boolean;
    description?: string;
  };
}
const TaskForm = ({ task }: TaskFormProps) => {
  const { userId } = auth();

  async function onSubmit(values: z.infer<typeof TaskSchema>) {}
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      user: userId || "",
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
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input disabled placeholder="email" {...field} />
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

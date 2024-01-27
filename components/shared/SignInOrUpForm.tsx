"use client";
import React from "react";
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
const SignInOrUpForm = () => {
  return <div>SignInOrUpForm</div>;
};

export default SignInOrUpForm;

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import NylasAuth from "../forms/NylasAuth";

interface CalendarCardProps {
  email: string;
}
export function CalendarCard({ email }: CalendarCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Connect Nylas</CardTitle>
        <CardDescription>Synchronize Calendar with Nylas</CardDescription>
      </CardHeader>
      <CardContent>
        <NylasAuth email={email} />
      </CardContent>
    </Card>
  );
}

import React from "react";
import { getUserInfo } from "@/lib/actions/users.actions";

interface CardContainerProps {
  children?: React.ReactNode;
  user: {
    clerkId: string;
    habits?: string[];
    tasks: string[];
    username: string;
    journalEntries?: string[];
    name: string;
    email: string;
    picture: string;
    createdAt: string;
    // Add other required properties from IUser type
  };

  type: string;
}
const CardContainer = ({ children, user, type }: CardContainerProps) => {
  getUserInfo(user.clerkId);

  return <div className="container">CardContainer</div>;
};

export default CardContainer;

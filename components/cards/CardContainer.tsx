import React from "react";

interface CardContainerProps {
  children?: React.ReactNode;
  user: {
    clerkId: string;
    habits?: string[];
    tasks: string[];
    username: string;
    journalEntries?: string[];
  };

  type: string;
}
const CardContainer = () => {
  return <div className="container">CardContainer</div>;
};

export default CardContainer;

import React from "react";
interface TaskProps {
  task: {
    userId: string;
    title: string;
    dueDate: Date | null;
    completed: boolean;
    description?: string;
  };
}
const Task = ({ task }: TaskProps) => {
  return <div>Task</div>;
};

export default Task;

"use client";
import React, { useState } from "react";

import { ITask } from "@/database/models/task.model";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Task = ({ _id, dueDate, title, description, completed }: ITask) => {
  const { userId } = useAuth();
  const [complete, setComplete] = useState<boolean | null | undefined>(null);
  const handleChange = () => {
    setComplete(!complete);
  };
  return (
    <div key={_id} className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
          <Checkbox onChange={handleChange} />
        </div>
      </div>
      <Link href={`/tasks/${userId}/${_id}`}>
        <a className="paragraph-semibold">View Task</a>
      </Link>
    </div>
  );
};

export default Task;

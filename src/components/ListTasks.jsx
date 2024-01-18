import React, { useEffect, useState } from "react";
import { Section } from "./Section";
import { useSelector } from "react-redux";

export const ListTasks = () => {
  const tasks = useSelector((state) => state.todoReducers.tasks);

  const [todos, setTodos] = useState([]);
  const [inProgress, setInprogrss] = useState([]);
  const [closed, setClosed] = useState([]);

  //Here we filter the tasks according to their status before rendering it to the page.
  useEffect(() => {
    if (tasks !== null) {
      const filteredTodos = tasks.filter((task) => task.status === "todo");
      const filteredInProgress = tasks.filter(
        (task) => task.status === "in progress"
      );
      const filteredClosed = tasks.filter((task) => task.status === "closed");

      setTodos(filteredTodos);
      setInprogrss(filteredInProgress);
      setClosed(filteredClosed);
    }
  }, [tasks]);

  const statuses = ["todo", "in progress", "closed"];

  return (
    <div className="flex flex-wrap gap-16">
      {statuses.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        );
      })}
    </div>
  );
};

import React from "react";
import { Task } from "./Task";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateToDoStatus } from "../app/actions";

export const Section = ({ status, todos, inProgress, closed }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => dispatch(updateToDoStatus(item.id, status)), // we upadte the status of task on dropping it.
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;
  if (status === "in progress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  return (
    <div
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-400" : ""}`}
      ref={drop}
    >
      <Header text={text} bg={bg} count={tasksToMap.length}>
        {status}
      </Header>
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
    </div>
  );
};

// Headers of different progresses....

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

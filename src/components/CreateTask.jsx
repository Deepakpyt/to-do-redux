import React, { useContext, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { ThemeContext } from "../App";
import { addToDo } from "../app/actions";
import { useDispatch } from "react-redux";

export const CreateTask = () => {
  const { theme } = useContext(ThemeContext);

  let bgColor = theme ? "bg-slate-700" : "bg-slate-100";
  let textColor = theme ? "text-amber-50" : "";

  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  console.log(task);

  const inputRef = useRef();
  // useRef to focusing on Input field.
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.length < 3)
      return toast.error("A task should have more then 3 characters.");

    if (task.length > 50)
      return toast.error("A task should not have more then 50 characters.");

    dispatch(addToDo(task));

    toast.success("Task Created.");

    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={`border-2 border-slate-400 ${bgColor} ${textColor} rounded-md mr-4 h-12 w-64 px-1`}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        ref={inputRef}
      />
      <button className="bg-cyan-400 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  );
};

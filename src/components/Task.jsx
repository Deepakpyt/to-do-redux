import React, { useContext, useState } from "react";

import { ThemeContext } from "../App";
import { useDrag } from "react-dnd";
import { deleteToDo } from "../app/actions";
import { useDispatch } from "react-redux";
import { ModifyModal } from "./ModifyModal";

export const Task = ({ task }) => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  let bgColor = theme ? "bg-red-300" : "";
  let textColor = theme ? "text-amber-50" : "";

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const activeModal = () => setModal(!modal);

  return (
    <div
      className={`${bgColor} ${textColor} relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : ""
      }`}
      ref={drag}
    >
      <p>{task.name}</p>
      <button
        className={`absolute bottom-1 right-8 text-blue-700`}
        onClick={activeModal}
        disabled={true && task.status !== "todo"} //cannot modify in "in progress" and "closed" status
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      {modal && <ModifyModal activeModal={activeModal} taskid={task.id} />}
      <button
        className={`absolute bottom-1 right-1 text-red-400`}
        onClick={() => dispatch(deleteToDo(task.id))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

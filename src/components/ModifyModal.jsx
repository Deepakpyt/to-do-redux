import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyToDo } from "../app/actions";
import toast from "react-hot-toast";
export const ModifyModal = ({ activeModal, taskid }) => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.length < 3)
      return toast.error("A task should have more then 3 characters.");

    if (task.length > 50)
      return toast.error("A task should not have more then 50 characters.");

    dispatch(modifyToDo(taskid, task));

    setTask("");

    activeModal();
  };
  return (
    <div className={`fixed inset-0 bg-gray-700 bg-opacity-90 z-10`}>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md max-w-sm p-4 shadow-blue`}
      >
        <form onSubmit={handleSubmit}>
          <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
            Modify Task
          </span>
          <input
            type="text"
            className={`border-2 border-slate-400 bg-white text-cyan-800 rounded-md mr-4 mt-1 h-12 w-full px-1`}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            // ref={inputRef}
          />
          <button className="bg-cyan-400 rounded-md px-4 h-12 text-white m-1">
            Create
          </button>
          <button
            className="bg-gray-700 rounded-md px-4 h-12 text-white m-1"
            onClick={activeModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

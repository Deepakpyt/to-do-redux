import toast from "react-hot-toast";

const initialData = {
  tasks: JSON.parse(localStorage.getItem("xtodos")) || [],
};

const todoReducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADD-TODO":
      var { id, name, status } = action.payload;
      const updatedState = {
        ...state,
        tasks: [...state.tasks, { id, name, status }], //ES6
      };
      localStorage.setItem("xtodos", JSON.stringify(updatedState.tasks));
      return updatedState;

    case "UPDATE":
      var { id, status } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }

        return task;
      });

      localStorage.setItem("xtodos", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };

    case "DELETE":
      const tasksAfterDeletion = state.tasks.filter(
        (task) => task.id !== action.id
      );
      toast("Task is deleted.", { icon: "🗑️" });

      localStorage.setItem("xtodos", JSON.stringify(tasksAfterDeletion));
      return {
        ...state,
        tasks: tasksAfterDeletion,
      };

    case "MODIFY":
      const tasksAfterModification = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          if (name !== "" && name !== null) {
            task.name = action.payload.name;
            toast("Task is Modified.", { icon: "📝" });
          }
          return task;
        }
        return task;
      });

      localStorage.setItem("xtodos", JSON.stringify(tasksAfterModification));

      return {
        ...state,
        tasks: tasksAfterModification,
      };

    default:
      return state;
  }
};

export default todoReducers;

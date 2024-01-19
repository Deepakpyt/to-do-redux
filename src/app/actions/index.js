import { v4 as uuidv4 } from "uuid";

export const addToDo = (data) => {
  return {
    type: "ADD-TODO",
    payload: {
      id: uuidv4(),
      name: data,
      status: "todo",
    },
  };
};

export const updateToDoStatus = (id, status) => {
  return {
    type: "UPDATE",
    payload: {
      id: id,
      status: status,
    },
  };
};

export const deleteToDo = (id) => {
  return {
    type: "DELETE",
    id: id,
  };
};

export const modifyToDo = (id, name) => {
  return {
    type: "MODIFY",
    payload: {
      id: id,
      name: name
    }
  };
};

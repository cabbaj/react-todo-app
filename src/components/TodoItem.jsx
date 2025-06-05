import { MdDelete, MdEdit } from "react-icons/md";
import { useRef, useState } from "react";

const TodoItem = ({ todo, id, deleteTask, updateTask}) => {
  const [title, setTitle] = useState(todo.title);

  // refer to dialog element
  const dialog = useRef();

  // for set mode and check
  const [editing, setEditing] = useState(false);

  // open dialog when click on button
  const openDialog = (isEditing) => {
    isEditing ? setEditing(true) : setEditing(false);
    dialog.current.showModal();
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (editing) {
      const task = {
        title: title,
        date: todo.date,
      };

      // pass id to check in .map
      updateTask(id, task);
    } else {
      // pass argument to deleteTask
      deleteTask(id);
    }
    closeDialog();
  };

  const clickOutsideDialog = (e) => {
    // dialog is entire screen exclude form
    if (e.target === dialog.current) {
      closeDialog();
    }
  };

  const closeDialog = () => {
    dialog.current.close();
  };

  return (
    <>
      <li className="flex bg-white rounded shadow-sm p-4 mt-4 first:mt-0">
        <div className="flex gap-x-4 mr-auto items-center">
          <div className="h-6 w-6 rounded-full shadow-sm text-white text-sm bg-teal-400 text-center content-center">
            <p className="font-semibold">{id + 1}</p>
          </div>
          <div>
            <p className="font-semibold text-black">{todo.title}</p>
            <p className="text-sm text-gray-400">{todo.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <button onClick={() => openDialog(false)} type="button" className="todo-btn">
            <MdDelete />
          </button>
          <button onClick={() => openDialog(true)} type="button" className="todo-btn">
            <MdEdit />
          </button>
        </div>
      </li>
      <dialog
        ref={dialog}
        onClick={clickOutsideDialog}
        className="rounded-md w-[480px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-800/50"
      >
        <form className="p-6" onSubmit={submitForm}>
          <h3 className="font-semibold text-xl">{editing ? "Edit Task" : "Delete Task"}</h3>
          <div className="mt-2">
            {editing ? (
              <input
                type="text"
                className="focus:outline-none w-full text-black rounded py-2 px-3 border"
                maxLength="30"
                placeholder="New Task Here"
                autoFocus
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            ) : (
              "Are you sure you want to delete this task?"
            )}
          </div>
          <div className="mt-12 text-end space-x-2">
            <button
              type="submit"
              className={
                editing
                  ? "rounded bg-teal-500 px-3 py-2 text-white hover:bg-teal-600"
                  : "rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              }
            >
              {editing ? "Confirm" : "Delete"}
            </button>
            <button
              onClick={closeDialog}
              type="button"
              className="rounded border border-gray-200 px-3 py-2 hover:bg-gray-200"
            >
              close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TodoItem;

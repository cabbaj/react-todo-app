import TodoItem from "../components/TodoItem";
import NewTask from "../components/NewTask";

import { useState } from "react";

import Spinner from "../components/Spinner";

// for noti
import { toast } from "react-toastify";

// seperate duty dont put all code in one file
// NewTask.jsx is pass value to Home.jsx
// Home.jsx is set the state of todos that recieve from NewTask.jsx
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // set delay for loading
  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  // this function will be passed to NewTask.jsx component
  // it give Newtask.jsx use this function
  const addTask = async (task) => {
    setLoading(true);
    setTodos((prevTodos) => [...prevTodos, task]);
    /*  it like prevTodos = [{ title: "workout", date: "2023-09-30" },{ title: "study", date: "2023-09-30" }]
    * setTodos([
        { title: "workout", date: "2023-09-30" },  // First existing task
        { title: "study", date: "2023-09-30" },    // Second existing task
        { title: "pushup", date: "2023-10-01" }    // New task
      ]);
    * we can not use todos.push() cuz setTodos is function and in () should be variable */
    await delay();
    setLoading(false);
    toast.success("Successfully Added!");
  };

  // this function will pass to TodoItem.jsx
  const deleteTask = (id) => {
    // i is index that .filter was defined
    // _ is value of "todo" but we dont need it then use "_"
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== id));
    toast.success("Successfully Deleted!");
  };

  const updateTask = (id, task) => {
    // map for change each todo in array
    // which todo has index = id then change value to task
    setTodos((prevTodos) => prevTodos.map((todo, i) => (i === id ? task : todo)));
    toast.success("Successfully Updated!");
  };

  return (
    <>
      {/* addTask is a name of prop // {addTask} is a function that pass to NewTask.jsx */}
      <NewTask addTask={addTask} />

      {loading ? (
        <Spinner />
      ) : (
        todos.length > 0 && (
          /* show todo list */
          <ul className="bg-gray-200 rounded-md shadow-sm p-4">
            {/* define index to create id then pass to TodoItem.jsx */}
            {todos.map((todo, index) => (
              // pass deleteTask function to TodoItem.jsx
              <TodoItem
                key={index}
                id={index}
                todo={todo}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default Home;

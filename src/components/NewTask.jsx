// this is child component
// it will pass value to parent component  
import { useRef } from "react";

// AddTask is not prop but it's a function pass to Home.jsx
const NewTask = ({ addTask }) => {
  // const [title, setTitle] = useState("");
  
  // for input
  const title = useRef();
  // access form element like a document.getElementBy
  const form = useRef();

  const submitForm = (e) => {
    // e is the event object of form 
    // Prevent refershing the page cuz submit form it will refresh the page automatically
    e.preventDefault();

    // create object task
    const task = {
      // use .current to get the value of input if using useRef
      title: title.current.value,
      date: new Date().toLocaleString()
    }

    // this function pass from Home.jsx
    addTask(task);

    form.current.reset();
  }

  return (
    <form ref={form} onSubmit={submitForm}>
      <label htmlFor="task" className="text-lg text-white">
        Add New Task
      </label>
      <div className="flex gap-x-2 bg-white rounded-md shawdow-sm p-2 pl-3 mt-2">
        <input
          id="task"
          type="text"
          className="focus:outline-none w-full text-black"
          maxLength="30"
          placeholder="New Task Here"
          autoFocus
          required
          ref={title}
          // value={title} // title from useState, default is empty string
          // onChange={(e) => setTitle(e.target.value)} // update title state
        />
        <button
          type="submit"
          className="w-40 px-3 py-2 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600"
        >
          New Task
        </button>
      </div>
    </form>
  );
};

export default NewTask;

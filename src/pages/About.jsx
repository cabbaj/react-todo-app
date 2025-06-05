import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const About = () => {
  const [loading, setLoading] = useState(false);

  const [todos, setTodos] = useState([]);

  // handle fetch api by using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        toast.error("Failed to fetch todos");
      } finally {
        setLoading(false);
        toast.success("Fetched!");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        todos.length > 0 && (
          <div className="container mx-auto p-4">
            <h1 className="text-3xl; font-bold mb-6 text-center">Fetch Data</h1>
            {todos.map((todo) => (
              <div key={todo.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="text-xl text-gray-800">
                  <span className="font-bold">#{todo.id}</span> {todo.title}
                </h3>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default About;

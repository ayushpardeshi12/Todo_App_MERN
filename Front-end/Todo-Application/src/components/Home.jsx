import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [deletedTodoId, setDeletedTodoId] = useState(null);
  const [completed, setCompleted] = useState(true);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };
  const fetchTodosFromBackend = async () => {
    try {
      const response = await axios.get("http://localhost:8005/todos");
      // setTodos(response.data.filter((todo) => todo.id !== deletedTodoId));
      setTodos(response.data.filter((todo) => todo.id !== deletedTodoId));
      console.log(response.data[0]._id);
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchTodosFromBackend();
  }, []); // Empty dependency array to run effect only once on component mount

  const handleAddTodo = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8005/todos", { title, description })
      .then(() => {
        console.log("Todo added successfully:");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });

    setTitle("");
    setDescription("");

    fetchTodosFromBackend();
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8005/todos/${todoId}`);
      setDeletedTodoId(todoId);
      fetchTodosFromBackend();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleCompleted = () => {
    const completedTodo = document.getElementsByClassName("completed");
    if (completed === false) {
      completedTodo.style.textDecoration = "line-through";
      setCompleted(true);
    } else {
      completedTodo.style.textDecoration = "none";
      setCompleted(false);
    }
    console.log(completed);
  };

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold my-5">
          TaskMaster - <span className="stroke">Empower Your Day!</span>
        </h1>

        <div className="my-6">
          <input
            type="text"
            placeholder="Hurry Title Up!!!"
            value={title}
            id="title"
            name="title"
            onChange={handleTitleChange}
            className="mx-2 px-3 py-2 my-2 w-[25rem] h-12 border-2 border-neutral-600 rounded-md"
          />
          <input
            type="text"
            placeholder="Add Your Task For Day"
            value={description}
            id="description"
            name="description"
            onChange={handleDescChange}
            className="mx-2 px-3 py-2 my-2 w-[25rem] h-12 border-2 border-neutral-600 rounded-md"
          />
        </div>

        <button
          type="submit"
          onClick={handleAddTodo}
          className="bg-red-700 text-white w-[120px] py-2"
        >
          Add Todo
        </button>

        {/* Todos Render Section */}
        <div className="flex justify-center">
          <ul>
            {todos.map((todo, index) => (
              <li
                className="flex justify-between px-3 items-center bg-color w-[50rem] my-4 rounded-md"
                key={index}
              >
                <div className="todo-div flex">
                  <input
                    type="checkbox"
                    value={completed}
                    onChange={() => handleToggleCompleted(todo._id)}
                    className="completed mr-2"
                  />
                  <div>
                    <h3 className="py-2 px-2 text-xl text-left">
                      {index + 1}. Title - {todo.title}
                    </h3>
                    <p className="py-2 px-2 text-left">
                      Decription : {todo.description}
                    </p>
                  </div>
                </div>
                <div className="button-div">
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="bg-red-700 text-white w-[45px] py-2"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;

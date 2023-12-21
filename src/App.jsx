import React, { useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleComplete,
  statistic,
} from "./features/todoSlice";

function App() {
  const title = useRef();
  const completedCkeck = useRef();
  const dispatch = useDispatch();
  const { todos, completed, uncompleted } = useSelector((store) => store.todo);

  useEffect(() => {
    dispatch(statistic());
  }, [todos, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      title: title.current.value,
      completed: completedCkeck.current.checked,
    };

    dispatch(addTodo(newTodo));
    title.current.value = "";
    completedCkeck.current.checked = false;
  };

  return (
    <div className="w-full max-w-[80%] mx-auto py-10 flex flex-col md:flex-row justify-evenly">
      <form onSubmit={handleSubmit} className="text-white">
        <div className="mb-3">
          <h2 className="text-2xl font-bold">Add new todo</h2>
          <span className="block mb-2">Title</span>
          <input
            required
            ref={title}
            type="text"
            className="input input-bordered input-warning w-full text-slate-800 font-bold"
          />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <span className="block mb-2">Completed</span>
            <input
              ref={completedCkeck}
              type="checkbox"
              // checked
              className="checkbox checkbox-warning"
            />
          </div>
          <button>Add</button>
        </div>
      </form>
      <div>
        <h1 className="text-white text-3xl font-bold flex mb-3">
          My todos with redux
        </h1>
        <ul className="flex flex-col gap-1 text-white">
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className="flex flex-col items-center gap-3 p-3 bg-slate-800 m-auto w-full rounded"
              >
                <div className="flex flex-col w-full">
                  <h2 className="text-xl font-bold">{todo.title}</h2>
                  <p className="text-sm">
                    Completed:{" "}
                    <span
                      className={
                        todo.completed ? "text-green-300" : "text-red-500"
                      }
                    >
                      {todo.completed ? "true" : "false"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-1 w-full justify-between ">
                  <button
                    onClick={() => dispatch(toggleComplete(todo.id))}
                    className="btn-success"
                  >
                    {todo.completed ? "Uncomplite" : "Complete"}
                  </button>
                  <button
                    onClick={() => {
                      dispatch(removeTodo(todo.id));
                    }}
                    className="btn-warning"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between mt-3 text-slate-500">
          <h2>Completed: {completed}</h2>
          <h2>Uncompleted: {uncompleted}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;

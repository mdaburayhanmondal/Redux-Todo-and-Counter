import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, delTodo, doneTodo } from '../redux/features/todo/todoSlice';
import { toggleDarkMode } from '../redux/features/preference/preferenceSlice';

const ToDo = () => {
  const { items, loading, error } = useSelector((state) => state.todos);
  const darkMode = useSelector((state) => state.preferences.darkMode);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  if (loading) <p>Loading...</p>;
  if (error) <p>Loading: {error}</p>;

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };
  const handleDelete = (id) => {
    dispatch(delTodo(id));
  };

  const handleDone = (id) => {
    dispatch(doneTodo(id));
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 p-10 gap-y-4 transition-colors duration-300">
      <div className="flex gap-x-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-200">
          To-Do List
        </h1>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={` rounded-lg px-2 py-1 ${
            darkMode ? 'bg-yellow-300 text-black' : 'bg-slate-900 text-white'
          }`}
        >
          {darkMode ? 'To Light' : 'To Dark'}
        </button>
      </div>
      {/* Input Section */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter task..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black dark:placeholder:text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-400 dark:bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="w-full max-w-md">
        <ul className="flex flex-col gap-2">
          {items.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700"
            >
              <span
                className={todo.completed ? 'line-through text-gray-400' : ''}
                onClick={() => handleDone(todo.id)}
              >
                {todo.text}
              </span>
              <span
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 cursor-pointer hover:underline text-sm font-medium"
              >
                Delete
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;

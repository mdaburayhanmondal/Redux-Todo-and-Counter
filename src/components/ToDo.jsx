import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  clearError,
  delTodo,
  toggleTodo,
} from '../redux/features/todo/todoSlice';
import { toggleDarkMode } from '../redux/features/preference/preferenceSlice';

const ToDo = () => {
  const dispatch = useDispatch();

  const { items: todos, loading, error } = useSelector((state) => state.todos);
  const darkMode = useSelector((state) => state.preferences.darkMode);

  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleDelete = (id) => {
    dispatch(delTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  // Clear error on mount
  React.useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  // Dark mode effect
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 p-10 gap-y-6 transition-colors duration-300">
      <div className="flex items-center gap-x-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-200">
          Redux To-Do List
        </h1>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`rounded-lg px-4 py-2 font-medium transition ${
            darkMode
              ? 'bg-yellow-300 text-black hover:bg-yellow-400'
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Input */}
      <div className="flex w-full max-w-md gap-3">
        <input
          type="text"
          placeholder="Enter task..."
          className="flex-1 rounded-md border border-gray-300 dark:border-slate-600 px-4 py-2 
                     bg-white dark:bg-slate-800 text-black dark:text-white 
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="bg-blue-500 dark:bg-purple-600 text-white px-6 py-2 rounded-md 
                     hover:bg-blue-600 dark:hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading...</p>
      )}
      {error && (
        <p className="text-red-600 dark:text-red-400 mt-4">Error: {error}</p>
      )}

      {/* Todo List */}
      <div className="w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No tasks yet. Add one!
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white dark:bg-slate-800 dark:text-white 
                           p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700"
              >
                <span
                  className={`flex-1 cursor-pointer ${
                    todo.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : ''
                  }`}
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                             font-medium transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ToDo;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'ToDoSlice',
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    delTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    doneTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, delTodo, doneTodo } = todoSlice.actions;

export default todoSlice.reducer;

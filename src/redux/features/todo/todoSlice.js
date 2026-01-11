import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',

  initialState,

  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
          },
        };
      },
    },

    delTodo(state, action) {
      const index = state.items.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    toggleTodo(state, action) {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const { addTodo, delTodo, toggleTodo, clearError } = todoSlice.actions;

export default todoSlice.reducer;

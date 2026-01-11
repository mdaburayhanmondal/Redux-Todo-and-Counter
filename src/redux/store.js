import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/features/todo/todoSlice';
import preferencesReducer from '../redux/features/preference/preferenceSlice';
import counterReducer from '../redux/features/counter/counterSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    preferences: preferencesReducer,
    counter: counterReducer,
  },
});

export default store;

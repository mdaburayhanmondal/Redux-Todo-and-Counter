import { createSlice } from '@reduxjs/toolkit';

const preferenceSlice = createSlice({
  name: 'preferences',
  initialState: { darkMode: true },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = preferenceSlice.actions;

export default preferenceSlice.reducer;

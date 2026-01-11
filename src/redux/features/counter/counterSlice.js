import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  randomNumber: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value = Math.max(0, state.value - 1);
    },
    double: (state) => {
      state.value *= 2;
    },
    reset: (state) => {
      state.value = 0;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addRandom: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomNumber.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRandomNumber.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.randomNumber = action.payload;
      })
      .addCase(fetchRandomNumber.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  increment,
  decrement,
  double,
  reset,
  incrementByAmount,
  addRandom,
} = counterSlice.actions;
export default counterSlice.reducer;

export const fetchRandomNumber = createAsyncThunk(
  'counter/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const random = Math.floor(Math.random() * 100) + 1;
      return random;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

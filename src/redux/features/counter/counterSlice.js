import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0, // your existing counter
  fetchedValue: null, // ← new: will store the fetched number
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // string | null
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
    fetchStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.status = 'succeeded';
      state.fetchedValue = action.payload;
    },
    fetchFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload; // we will put error message here
    },
  },
});

export const {
  increment,
  decrement,
  double,
  reset,
  incrementByAmount,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = counterSlice.actions;
export default counterSlice.reducer;

// Thunk 1
export const logSomething = () => async (dispatch, getState) => {
  console.log('Thunk started!');

  const currentValue = getState().counter.value;
  console.log('Current count is:', currentValue);

  console.log(`3 will be added in ${currentValue} seconds...`);

  await new Promise((resolve) => setTimeout(resolve, currentValue * 1000));

  dispatch(increment());
  dispatch(increment());
  dispatch(increment());
  console.log('Just added 3 to the value!');
};

// Thunk 2
export const fetchRandomNumber = () => async (dispatch, getState) => {
  try {
    dispatch(fetchStart());

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    // number is from the post id
    const randomNum = data.id * 10 + Math.floor(Math.random() * 100);

    dispatch(fetchSuccess(randomNum));
  } catch (err) {
    dispatch(fetchFailure(err.message || 'Something went wrong'));
  }
};

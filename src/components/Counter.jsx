import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  double,
  fetchRandomNumber,
  increment,
  incrementByAmount,
  logSomething,
  reset,
} from '../redux/features/counter/counterSlice';
import { useState } from 'react';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const isZero = count === 0;
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState('');
  const isInvalid = amount !== '' && isNaN(Number(amount));

  const status = useSelector((state) => state.counter.status);
  const fetchedValue = useSelector((state) => state.counter.fetchedValue);
  const error = useSelector((state) => state.counter.error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Redux Counter App</h1>
      <div className="flex flex-col items-center">
        <big className="text-3xl font-bold text-black">{count}</big>
        <small className="text-xl font-bold text-black">{count}</small>
      </div>
      <div className="flex gap-x-10">
        <BiPlus
          onClick={handleIncrement}
          className="size-10 px-3 py-1 bg-green-200 rounded-lg hover:bg-green-500"
        />
        <button onClick={handleDecrement} disabled={isZero}>
          <BiMinus
            className={`size-10 px-3 py-1 bg-red-200 rounded-lg hover:bg-red-500 ${
              isZero && 'cursor-not-allowed'
            }`}
          />
        </button>
        <button
          onClick={() => dispatch(double())}
          className={`px-3 py-1 bg-yellow-200 rounded-lg hover:bg-yellow-500 ${
            isZero && 'cursor-not-allowed'
          }`}
        >
          Double
        </button>
        <button
          disabled={isZero}
          onClick={handleReset}
          className={`px-3 py-1 bg-cyan-200 rounded-lg hover:bg-cyan-500 ${
            isZero && 'cursor-not-allowed'
          }`}
        >
          Reset
        </button>
      </div>
      <div className="w-full flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter amount..."
          className="border-0 outline-1 rounded px-3 py-1 w-2/3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Real-time error message */}
        {isInvalid && (
          <p className="text-red-600 text-sm mt-1">
            Please enter a valid number
          </p>
        )}

        <button
          onClick={() => {
            setReport('');
            const num = Number(amount.trim());

            if (!isNaN(num) && amount.trim() !== '') {
              dispatch(incrementByAmount(num));
              setAmount('');
              setVisible(true);
              setTimeout(() => setVisible(false), 1500);
              setReport('Changed ✓');
            }
          }}
          disabled={isInvalid || amount.trim() === ''}
          className={`${isInvalid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Add
        </button>

        {visible && (
          <p
            className={
              report.includes('Changed') ? 'text-green-600' : 'text-red-600'
            }
          >
            {report}
          </p>
        )}
      </div>
      <button
        onClick={() => dispatch(logSomething())}
        className="px-6 py-3 bg-purple-200 rounded-lg hover:bg-purple-400"
      >
        Test Thunk (check console)
      </button>
      <div className="mt-8">
        <button
          onClick={() => dispatch(fetchRandomNumber())}
          disabled={status === 'loading'}
          className="px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          {status === 'loading' ? 'Fetching...' : 'Fetch Random Number'}
        </button>

        {status === 'loading' && (
          <p className="mt-2 text-gray-600">Loading...</p>
        )}
        {status === 'succeeded' && (
          <p className="mt-2 text-green-600">
            Fetched value: <strong>{fetchedValue}</strong>
          </p>
        )}
        {status === 'failed' && (
          <p className="mt-2 text-red-600">Error: {error}</p>
        )}
      </div>
    </div>
  );
};

export default Counter;

import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  double,
  fetchRandomNumber,
  increment,
  incrementByAmount,
  reset,
  addRandom,
} from '../redux/features/counter/counterSlice';
import { useState } from 'react';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const isZero = count === 0;
  const dispatch = useDispatch();

  const { randomNumber, status, error } = useSelector((state) => state.counter);
  const isLoading = status === 'loading';

  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState('');

  const isInvalid = amount !== '' && isNaN(Number(amount));

  const handleAddAmount = () => {
    setReport('');
    const num = Number(amount.trim());

    if (!isNaN(num) && amount.trim() !== '') {
      dispatch(incrementByAmount(num));
      setAmount('');
      setVisible(true);
      setReport('Added ✓');
      setTimeout(() => setVisible(false), 1800);
    }
  };

  const handleAddRandom = () => {
    dispatch(addRandom(randomNumber));
    setReport(`+${randomNumber} added!`);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 transition-all">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          Redux Counter
        </h1>

        {/* Main Counter Display */}
        <div className="text-center mb-10">
          <div className="text-7xl md:text-9xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {count}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          <button
            onClick={() => dispatch(increment())}
            disabled={isLoading}
            className="flex items-center justify-center w-14 h-14 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-300 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            <BiPlus className="w-7 h-7" />
          </button>

          <button
            onClick={() => dispatch(decrement())}
            disabled={isZero || isLoading}
            className={`flex items-center justify-center w-14 h-14 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-700 dark:text-red-300 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow ${
              isZero && 'opacity-60'
            }`}
          >
            <BiMinus className="w-7 h-7" />
          </button>

          <button
            onClick={() => dispatch(double())}
            disabled={isZero || isLoading}
            className={`px-6 py-4 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/50 text-yellow-700 dark:text-yellow-300 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow ${
              isZero && 'opacity-60'
            }`}
          >
            Double
          </button>

          <button
            onClick={() => dispatch(reset())}
            disabled={isZero || isLoading}
            className={`px-6 py-4 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:hover:bg-cyan-800/50 text-cyan-700 dark:text-cyan-300 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow ${
              isZero && 'opacity-60'
            }`}
          >
            Reset
          </button>
        </div>

        {/* Amount Input Section */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Enter amount..."
              className="w-full sm:w-64 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />

            <button
              onClick={handleAddAmount}
              disabled={isInvalid || !amount.trim() || isLoading}
              className={`px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
                isInvalid || isLoading ? 'opacity-60' : ''
              }`}
            >
              Add
            </button>
          </div>

          {isInvalid && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-3 text-center">
              Please enter a valid number
            </p>
          )}

          {visible && (
            <p
              className={`mt-4 text-center font-medium transition-opacity duration-500 ${
                report.includes('Changed') || report.includes('added')
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {report}
            </p>
          )}
        </div>

        {/* Fetch Random Section */}
        <div className="text-center">
          <button
            onClick={() => dispatch(fetchRandomNumber())}
            disabled={isLoading}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition disabled:opacity-50 shadow-md mb-6"
          >
            {isLoading ? 'Fetching...' : 'Fetch Random Number'}
          </button>

          {isLoading && (
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Please wait...
            </p>
          )}

          {status === 'succeeded' && (
            <div className="mt-6">
              <p className="text-xl font-semibold text-green-700 dark:text-green-400">
                New number:{' '}
                <span className="text-3xl font-bold">{randomNumber}</span>
              </p>

              <button
                onClick={handleAddRandom}
                className="mt-5 px-7 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-md"
              >
                Add {randomNumber} to Counter
              </button>
            </div>
          )}

          {status === 'failed' && (
            <p className="mt-6 text-lg text-red-600 dark:text-red-400">
              Error: {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counter;

import { useState } from 'react';
import axios from 'axios';

const ConfessionBox = ({ onNavigateToView }) => {
  const [inputConfession, setInputConfession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setInputConfession(event.target.value);

    // Automatically adjust the height of the textarea
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const submitConfessionBox = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('https://shayarians-backend.onrender.com/api/confessions', {
        content: inputConfession,  // Send confession as 'content'
      });
      console.log('Confession submitted successfully:', response.data);
      setInputConfession('');
    } catch (error) {
      console.error('Error submitting confession:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to submit confession. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Confession Box
        </h1>
        <form onSubmit={submitConfessionBox}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="confession"
            >
              Your Confession
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              id="confession"
              value={inputConfession}
              onChange={handleChange}
              placeholder="Write your confession here..."
              required
              rows="1"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 sm:px-6 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
              type="button"
              onClick={onNavigateToView}
            >
              View Confessions
            </button>
          </div>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-sm italic text-center mt-4">
            {errorMessage}
          </p>
        )}
      </div>
      <p className="text-center text-gray-500 text-xs mt-4">
        &copy;2024 Your Company. All rights reserved.
      </p>
    </div>
  );
};

export default ConfessionBox;

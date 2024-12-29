import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewConfessions = ({ onNavigateBack }) => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchConfessions = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await axios.get('https://shayarians-backend.onrender.com/api/confessions');
        if (Array.isArray(response.data)) {
          setConfessions(response.data);
        } else {
          setConfessions([]);
        }
      } catch (error) {
        console.error('Error fetching confessions:', error);
        const message = error.response?.data?.message || 'Failed to load confessions. Please try again.';
        setErrorMessage(message);
        setConfessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConfessions();
  }, []);

  const handleSupport = (id) => {
    setConfessions((prevConfessions) =>
      prevConfessions.map((confession) =>
        confession._id === id
          ? { ...confession, supportCount: (confession.supportCount || 0) + 1 }
          : confession
      )
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center min-h-screen bg-white ">
        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg p-6 md:p-8 mt-6 sm:mt-8 lg:mt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-6">
            Confessions
          </h1>
          {loading ? (
            <p className="text-center text-gray-700 text-lg">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500 text-center text-lg">{errorMessage}</p>
          ) : confessions.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">No confessions found</p>
          ) : (
            <ul className="space-y-6">
              {confessions.map((confession) => (
                <li
                  key={confession._id}
                  className="p-6 border-2 border-gray-200 rounded-lg shadow-lg bg-gray-50 text-gray-700"
                >
                  <p className="text-lg sm:text-xl font-medium">{confession.content}</p>
                  <div className="flex items-center mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                      onClick={() => handleSupport(confession._id)}
                    >
                      Support
                    </button>
                    <span className="ml-3 text-sm text-gray-600">
                      {confession.supportCount || 0} supports
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-center mt-8 sm:mt-12">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              onClick={onNavigateBack}
            >
              Back to Confession Box
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewConfessions;

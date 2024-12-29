import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewConfessions = ({ onNavigateBack }) => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [confessionsPerPage] = useState(5);
  const [selectedConfession, setSelectedConfession] = useState(null); // For modal

  useEffect(() => {
    const fetchConfessions = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await axios.get(
          'https://shayarians-backend.onrender.com/api/confessions'
        );
        if (Array.isArray(response.data)) {
          setConfessions(response.data);
        } else {
          setConfessions([]);
        }
      } catch (error) {
        console.error('Error fetching confessions:', error);
        const message =
          error.response?.data?.message ||
          'Failed to load confessions. Please try again.';
        setErrorMessage(message);
        setConfessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConfessions();
  }, []);

  // Handle pagination logic
  const indexOfLastConfession = currentPage * confessionsPerPage;
  const indexOfFirstConfession = indexOfLastConfession - confessionsPerPage;
  const currentConfessions = confessions.slice(
    indexOfFirstConfession,
    indexOfLastConfession
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSupport = (id) => {
    setConfessions((prevConfessions) =>
      prevConfessions.map((confession) =>
        confession._id === id
          ? { ...confession, supportCount: (confession.supportCount || 0) + 1 }
          : confession
      )
    );
  };

  const handleOpenModal = (confession) => setSelectedConfession(confession);

  const handleCloseModal = () => setSelectedConfession(null);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white">
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
            {currentConfessions.map((confession) => (
              <li
                key={confession._id}
                className="p-6 border-2 border-gray-200 rounded-lg shadow-lg bg-gray-50 text-gray-700 cursor-pointer"
                onClick={() => handleOpenModal(confession)}
              >
                <p className="text-lg sm:text-xl font-medium truncate">
                  {confession.content}
                </p>
                <div className="flex items-center mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSupport(confession._id);
                    }}
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

        <div className="flex justify-between items-center mt-8 sm:mt-12">
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastConfession >= confessions.length}
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={onNavigateBack}
          >
            Back to Confession Box
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedConfession && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl relative overflow-hidden">
      <button
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold"
        onClick={handleCloseModal}
      >
        ×
      </button>
      <h2 className="text-xl font-bold mb-4">Confession</h2>
      <div className="text-gray-800 text-lg whitespace-pre-line overflow-y-auto max-h-96">
        {selectedConfession.content}
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ViewConfessions;

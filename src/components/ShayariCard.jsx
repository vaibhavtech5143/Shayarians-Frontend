import { useState } from 'react';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import axios from 'axios';

export function ShayariCard({ shayari }) {
  const [likes, setLikes] = useState(shayari.likes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `https://shayarians-backend.onrender.com/api/shayari/${shayari._id}/like`
      );
      if (response.status === 200) {
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error liking shayari:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-4 mb-4 w-full sm:w-48 md:w-60 lg:w-72 mx-auto">
      {shayari.imageUrl ? (
        <>
          <img
            src={shayari.imageUrl}
            alt={shayari.title}
            className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
            onClick={openModal}
          />
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                className="scrollable-content relative max-w-full max-h-[90vh] overflow-auto p-2 bg-black rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-white text-4xl font-bold bg-black rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>

                <img
                  src={shayari.imageUrl}
                  alt={shayari.title}
                  className="max-w-full max-h-[70vh] object-contain mt-4"
                />

                {/* Shayari Text */}
                <p className="text-gray-300 mt-4 text-lg whitespace-pre-line">
                  {shayari.shayariTxt}
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className="bg-gray-100 w-full h-48 flex items-center justify-center rounded-lg mb-4 overflow-hidden cursor-pointer"
            onClick={openModal}
          >
            <p className="text-gray-800 text-lg italic truncate">{shayari.shayariTxt}</p>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                className="scrollable-content relative max-w-full max-h-[90vh] overflow-auto p-2 bg-black rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-white text-4xl font-bold bg-black rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>

                <p className="text-gray-300 mt-4 text-lg whitespace-pre-line">
                  {shayari.shayariTxt}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Shayari Title */}
      <h3 className="text-xl font-semibold mb-2 text-center text-purple-700 sm:text-left">
        {shayari.title}
      </h3>

      {/* Author Information */}
      {shayari.author && (
        <p className="text-gray-600 mb-4 text-center sm:text-left">
          By: <span className="font-medium">{shayari.author}</span>
        </p>
      )}

      {/* Actions: Like, Comment, Share */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleLike}
          className="text-gray-600 hover:text-red-500 flex items-center space-x-2"
        >
          <FaHeart />
          <span>{likes}</span>
        </button>
        <button className="text-gray-600 hover:text-blue-500 flex items-center space-x-2">
          <FaComment />
          <span>Comment</span>
        </button>
        <button className="text-gray-600 hover:text-green-500 flex items-center space-x-2">
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

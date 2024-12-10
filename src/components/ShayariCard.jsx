import { useState } from 'react';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import axios from 'axios';

export function ShayariCard({ shayari }) {
  const [likes, setLikes] = useState(shayari.likes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');

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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      {/* Conditional Rendering for Image or Shayari Text */}
      {shayari.imageUrl ? (
        <>
          <img
            src={shayari.imageUrl}
            alt={shayari.title}
            className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
            onClick={openModal}
          />
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <img
                src={shayari.imageUrl}
                alt={shayari.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking the image
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-100 w-full h-64 flex items-center justify-center rounded-lg mb-4 text-center p-4">
          <p className="text-gray-700 text-lg italic">{shayari.shayariTxt}</p>
        </div>
      )}

      {/* Shayari Title */}
      <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">{shayari.title}</h3>

      {/* Author Information */}
      {shayari.author && (
        <p className="text-gray-600 mb-2 text-center sm:text-left">By: {shayari.author}</p>
      )}

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="text-gray-600 hover:text-red-500 flex items-center justify-center sm:justify-start mt-2"
      >
        <FaHeart />
        <span className="ml-2">{likes}</span>
      </button>
    </div>
  );
}

import { useState, useRef } from 'react';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import axios from 'axios';
import html2canvas from "html2canvas";

export function ShayariCard({ shayari }) {
  const [likes, setLikes] = useState(shayari.likes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shareContentRef = useRef(null);

  // Like button handler
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

  // Share button handler
  const handleShare = async () => {
    try {
      if (shareContentRef.current) {
        const canvas = await html2canvas(shareContentRef.current);
        const imgData = canvas.toDataURL('image/png');

        const a = document.createElement('a');
        a.href = imgData;
        a.download = `${shayari.title}-${shayari.author}.png`;
        a.click();

        alert('Shayari image shared successfully!');
      } else {
        console.error('Content to share not found');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-4 mb-4 w-full sm:w-48 md:w-60 lg:w-72 mx-auto">
      
      {/* Shayari Image */}
      {shayari.imageUrl ? (
        <>
          <img
            src={shayari.imageUrl}
            alt={shayari.title}
            className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
            onClick={openModal}
          />

          {/* Modal for Image */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                className="scrollable-content max-w-full max-h-[90vh] overflow-auto p-4 bg-white rounded-lg shadow-lg backdrop-blur-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-black text-4xl font-bold bg-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>

                <img
                  src={shayari.imageUrl}
                  alt={shayari.title}
                  className="max-w-full max-h-[70vh] object-contain mt-4"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Shayari Text Placeholder */}
          <div
            className="bg-gray-100 w-full h-48 flex items-center justify-center rounded-lg mb-4 overflow-hidden cursor-pointer"
            onClick={openModal}
          >
           
            <p className="text-gray-800 text-lg italic truncate">{shayari.shayariTxt}</p>
          </div>

          {/* Modal for Text */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                ref={shareContentRef}
                className="scrollable-content max-w-full max-h-[90vh] overflow-auto p-8 bg-white rounded-lg shadow-lg backdrop-blur-lg"
                onClick={(e) => e.stopPropagation()}
              >
              <p className= "text-purple-700 text-lg italic truncate text-center">{shayari.title}</p>
                {/* Shayari Text */}
                <p className="text-gray-900 mt-4 text-lg whitespace-pre-line">
                  {shayari.shayariTxt}
                </p>

                {/* Share Button */}
                {/* <button
                  onClick={handleShare}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <FaShare />
                  Share
                </button> */}

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="mt-4 w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition-all"
                >
                  Close
                </button>
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

      {/* Actions: Like, Share */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleLike}
          className="hover:text-red-500 flex items-center space-x-2"
        >
          <FaHeart />
          <span>{likes}</span>
        </button>

        <button
          onClick={handleShare}
          className="hover:text-green-500 flex items-center space-x-2"
        >
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

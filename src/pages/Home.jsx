import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShayariCard } from '../components/ShayariCard';

function Home() {
  const [shayaris, setShayaris] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const genres = ['All', 'Love', 'Life', 'Nature', 'Friendship', 'Motivation', 'Other'];

  // Function to fetch shayaris from the backend
  const fetchShayaris = async () => {
    try {
      const url = selectedGenre && selectedGenre !== 'All' 
        ? `http://localhost:3000/api/shayari?genre=${selectedGenre}`
        : 'http://localhost:3000/api/shayari';
  
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log('------API Response Status:---------', response.status);
      console.log('-----=API Response Data:------', response.data);
  
      if (Array.isArray(response.data)) {
        setShayaris(response.data);
      } else {
        console.error('Response data is not an array:', response.data);
        setShayaris([]);
      }
    } catch (error) {
      console.error('API request error:', error.response || error.message);
      setShayaris([]);
    }
  };
  

  // Fetch shayaris whenever the selected genre changes
  useEffect(() => {
    fetchShayaris();
  }, [selectedGenre]);

  return (
    <div className="px-4 sm:px-6 lg:px-8"> {/* Padding adjusted for different screen sizes */}
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome To Shayarians</h2>
        <h3 className="text-lg mb-4">Place To Share hidden talent in an unhidden way</h3>
        <p className="text-md text-gray-500">Best Feature: It's Completely Anonymous, Just Like Your Relationship 😂😂</p>

        {/* Genre Buttons */}
        <div className="flex justify-center flex-wrap space-x-4 mt-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full mb-2 ${selectedGenre === genre ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Shayari Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {shayaris.length > 0 ? (
          shayaris.map((shayari) => (
            <ShayariCard key={shayari._id} shayari={shayari} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">No Shayaris Found</p>
        )}
      </div>
    </div>
  );
}

export default Home;

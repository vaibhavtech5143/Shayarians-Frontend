import { useState, useEffect, useCallback } from 'react';
import { ShayariCard } from '../components/ShayariCard';

function RandomShayari() {
  const [shayari, setShayari] = useState(null);
  const [key, setKey] = useState(0); // Used to force re-render

  const fetchRandomShayari = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/shayari/random');

      if (!response.ok) {
        throw new Error('Failed to fetch random shayari');
      }

      const data = await response.json();
      setShayari(data);
      setKey((prevKey) => prevKey + 1); // Increment key to force re-render
    } catch (error) {
      console.error('Error fetching random shayari:', error);
    }
  }, []);

  useEffect(() => {
    fetchRandomShayari();
  }, [fetchRandomShayari]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Random Shayari</h2>

      <button
        onClick={fetchRandomShayari}
        className="w-full mb-8 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Get Another Shayari
      </button>

      {/* Force re-render by using the key prop */}
      {shayari && <ShayariCard key={key} shayari={shayari} />}
    </div>
  );
}

export default RandomShayari;

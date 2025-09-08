import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";


export function HomePage() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await apiFetch('/api/home');
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        setMedia(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
      <p className="text-lg text-gray-600 mb-8">Discover amazing content shared by our community.</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {media.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img src={item.url} alt={item.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Error'; }} />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


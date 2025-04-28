import { useState } from 'react';
import { createMovie } from '../services/movieService';

const MovieForm = ({ onMovieCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseYear: 1888,
    genre: '',
    rating: 0,
    watched: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdMovie = await createMovie(formData);
      alert('Movie added successfully!');
      onMovieCreated();
    } catch (error) {
      console.error('Error creating movie:', error);
      alert('Failed to add movie. Please check the form fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
        ✨ Add New Movie
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Movie title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
          <input
            type="text"
            placeholder="Director name"
            value={formData.director}
            onChange={(e) => setFormData({ ...formData, director: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              placeholder="Release Year"
              value={formData.releaseYear}
              onChange={(e) =>
                setFormData({ ...formData, releaseYear: parseInt(e.target.value, 10) })
              }
              min="1888"
              max="2100"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"

              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input
              type="number"
              placeholder="Rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: parseFloat(e.target.value) })
              }
              step="0.1"
              min="0"
              max="10"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
          <input
            type="text"
            placeholder="Genre"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="watched"
            checked={formData.watched}
            onChange={(e) => setFormData({ ...formData, watched: e.target.checked })}
            className="h-5 w-5 text-purple-500 rounded focus:ring-purple-400"
          />
          <label htmlFor="watched" className="ml-2 text-sm text-gray-700">
            Watched this movie
          </label>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
        >
          🎉 Add Movie
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
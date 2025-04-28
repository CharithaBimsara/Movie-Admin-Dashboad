import UpdateMovieForm from './UpdateMovieForm';
import { deleteMovie } from '../services/movieService';
import { useState } from 'react';

const MovieList = ({ movies, onMovieUpdated, onMovieDeleted }) => {
  const [editingMovieId, setEditingMovieId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        await onMovieDeleted();
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie.');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await onMovieUpdated();
      setEditingMovieId(null);
    } catch (error) {
      console.error('Error refreshing movie list:', error);
    }
  };

  return (
    <div className="relative">
      {movies.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6 text-gray-700">🍿</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">Your collection is empty</h3>
          <p className="text-gray-500">Add your first movie to get started</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all group relative"
          >
            {editingMovieId === movie.id ? (
              <div className="p-4">
                <UpdateMovieForm movieId={movie.id} onUpdate={handleUpdate} />
              </div>
            ) : (
              <>
                <div className="aspect-[2/3] bg-gray-800 relative overflow-hidden">
                  {movie.posterPath ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = movie.backdropPath 
                          ? `https://image.tmdb.org/t/p/w300${movie.backdropPath}`
                          : '';
                      }}
                    />
                  ) : movie.backdropPath ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w300${movie.backdropPath}`}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <span className="text-gray-600 text-3xl">🎬</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-sm text-white line-clamp-1">{movie.title}</h3>
                      <p className="text-gray-400 text-xs">{movie.releaseYear}</p>
                    </div>
                    <div className="flex items-center bg-gray-800 px-1.5 py-0.5 rounded-full">
                      <span className="text-yellow-400 text-xs mr-0.5">★</span>
                      <span className="text-white text-xs">{movie.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-xs mb-2 text-gray-300">
                    <p className="truncate">
                      <span className="text-gray-500">Dir:</span> {movie.director || 'Unknown'}
                    </p>
                    <p className="truncate">
                      <span className="text-gray-500">Genre:</span> {movie.genre || 'Unknown'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 pt-2 border-t border-gray-800">
                    <button
                      onClick={() => setEditingMovieId(movie.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
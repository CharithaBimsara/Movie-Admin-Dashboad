import { useState, useEffect } from 'react';
import { fetchMovieById, updateMovie } from '../services/movieService';

const UpdateMovieForm = ({ movieId, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        releaseYear: 1888,
        genre: '',
        rating: 0,
        watched: false,
    });

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const movie = await fetchMovieById(movieId);
                setFormData({
                    title: movie.title,
                    director: movie.director,
                    releaseYear: movie.releaseYear,
                    genre: movie.genre,
                    rating: movie.rating,
                    watched: movie.watched,
                });
            } catch (error) {
                console.error('Error loading movie:', error);
            }
        };
        loadMovie();
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMovie(movieId, formData);
            alert('Movie updated successfully!');
            onUpdate();
        } catch (error) {
            console.error('Error updating movie:', error);
            alert('Failed to update movie.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                ✨ Update Movie
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
                    <input
                        type="text"
                        placeholder="Director"
                        value={formData.director}
                        onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                    />
                </div>
                
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="watched-update"
                        checked={formData.watched}
                        onChange={(e) => setFormData({ ...formData, watched: e.target.checked })}
                        className="h-4 w-4 text-green-500 rounded focus:ring-green-400"
                    />
                    <label htmlFor="watched-update" className="ml-2 text-sm text-gray-700">
                        Watched
                    </label>
                </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
                <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium py-2 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all"
                >
                    💾 Save Changes
                </button>
                <button 
                    type="button" 
                    onClick={() => onUpdate()}
                    className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all"
                >
                    ❌ Cancel
                </button>
            </div>
        </form>
    );
};

export default UpdateMovieForm;
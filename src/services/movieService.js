import { fetchPosterPath } from './tmdbService';

const BASE_URL = 'https://localhost:7096/api/Movies'; // Replace with your API URL

export async function fetchMovies() {
    const response = await fetch(`${BASE_URL}`);
    const movies = await response.json();
  
    // Attach posterPath by querying TMDB for each movie
    const moviesWithPosters = await Promise.all(
      movies.map(async (movie) => {
        if (!movie.posterPath) {
          const posterPath = await fetchPosterPath(movie.title);
          return { ...movie, posterPath };
        }
        return movie;
      })
    );
  
    return moviesWithPosters;
  }

export const fetchMovieById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
};

export const createMovie = async (movieData) => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error('Failed to create movie');
    return response.json();
};

export const updateMovie = async (id, movieData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return;
};

export const deleteMovie = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
    return;

};
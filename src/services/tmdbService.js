// services/tmdbService.js
const TMDB_API_KEY = '2ff8f6624431aa54cb08e7f12a52df9b'; // 🔥 Get a free API Key from TMDB (https://www.themoviedb.org/)

export async function fetchPosterPath(movieTitle) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].poster_path; // returns like '/path/to/poster.jpg'
  } else {
    return null;
  }
}

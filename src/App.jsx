import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from './services/movieService';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import { useState } from 'react';

function App() {
  const { data: movies = [], isLoading, error, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6">
          <svg className="animate-spin text-cyan-400" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Loading your movie collection...
        </h2>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
      <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl max-w-md mx-4 border border-white/20">
        <div className="text-yellow-400 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Loading Error
        </h2>
        <p className="text-white/80 mb-4">We couldn't load your movies:</p>
        <p className="text-yellow-200 bg-white/10 p-3 rounded">{error.message}</p>
        <button 
          onClick={() => refetch()}
          className="mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all w-full shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-b from-gray-900/90 to-transparent py-4 px-6 fixed w-full z-50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-cyan-400 text-3xl mr-2">🎬</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              MovieFlix Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all flex items-center shadow-lg hover:shadow-purple-500/30"
            >
              {showForm ? (
                <>
                  <span className="mr-2">✖</span> Close
                </>
              ) : (
                <>
                  <span className="mr-2">➕</span> Add Movie
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Movie Dashboard
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Manage your movie collection with full CRUD capabilities
              </p>
            </div>
            <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-white/70">Total Movies</p>
                <p className="text-2xl font-bold text-cyan-400">{movies.length}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-white/70">Avg. Rating</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {movies.length > 0 
                    ? (movies.reduce((acc, movie) => acc + (movie.rating || 0), 0) / movies.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-white/70">Watched</p>
                <p className="text-2xl font-bold text-green-400">
                  {movies.filter(m => m.watched).length}
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-white/70">Unwatched</p>
                <p className="text-2xl font-bold text-red-400">
                  {movies.filter(m => !m.watched).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-12">
        {/* Add Movie Form */}
        {showForm && (
          <div className="max-w-4xl mx-auto bg-white/5 rounded-2xl shadow-2xl p-8 mb-12 border border-white/10 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {movies.length > 0 ? 'Add New Movie' : 'Create Your First Movie'}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <MovieForm onMovieCreated={() => {
              refetch();
              setShowForm(false);
            }} />
          </div>
        )}

        {/* Movie Sections */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Movie Collection
            </h2>
            <div className="text-white/70">
              Showing {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
            </div>
          </div>
          
          <MovieList 
            movies={movies} 
            onMovieUpdated={refetch} 
            onMovieDeleted={refetch} 
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 py-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-cyan-400 text-2xl mr-2">🎬</span>
                <h2 className="text-xl font-bold">MovieFlix Admin</h2>
              </div>
              <p className="text-white/60 mt-1">Your professional movie management system</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Dashboard</a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Analytics</a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Settings</a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Help</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
            <p>© {new Date().getFullYear()} MovieFlix Admin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
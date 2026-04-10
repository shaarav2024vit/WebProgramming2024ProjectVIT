import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { movies, genres as dataGenres } from '../data/movies';
import MovieCard from '../components/MovieCard';
import '../styles/Browse.css';

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const genres = dataGenres;

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];

    if (searchTerm) {
      result = result.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (genreFilter && genreFilter !== 'All') {
      result = result.filter(m => m.genre === genreFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.year - a.year;
    });

    return result;
  }, [searchTerm, genreFilter, sortBy]);

  const highestRatedMovie = [...movies].sort((a, b) => b.rating - a.rating)[0];

  return (
    <div className="browse-page">
      {highestRatedMovie && !searchTerm && genreFilter === '' && sortBy === 'date' && (
        <Link to={`/movie/${highestRatedMovie.id}`} className="hero-section">
          <div className="hero-bg" style={{ backgroundImage: `url(${highestRatedMovie.poster})` }}></div>
          <div className="hero-poster" style={{ backgroundImage: `url(${highestRatedMovie.poster})` }}></div>
          <div className="hero-content">
            <span className="hero-label">FEATURED</span>
            <h2 className="hero-title">{highestRatedMovie.title}</h2>
            <p className="hero-meta">{highestRatedMovie.year} <span className="separator">·</span> {highestRatedMovie.genre}</p>
            <span className="hero-link">View Film &rarr;</span>
          </div>
        </Link>
      )}

      <div className="editorial-header">
        <h1>All Films</h1>
        <span className="count">{filteredAndSortedMovies.length} titles</span>
      </div>

      <div className="controls">
        <input 
          type="text" 
          placeholder="Search films..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filters">
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            {genres.map(g => (
              <option key={g} value={g}>{g === 'All' ? 'All Genres' : g}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Year</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredAndSortedMovies.length > 0 ? (
          filteredAndSortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="no-results">No films found.</p>
        )}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/MovieCard.css';

export default function MovieCard({ movie }) {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const syncWatchlist = () => {
      const list = JSON.parse(localStorage.getItem('watchlist')) || [];
      setInWatchlist(list.some(m => m.id === movie.id));
    };

    syncWatchlist();

    window.addEventListener('watchlistUpdated', syncWatchlist);
    return () => window.removeEventListener('watchlistUpdated', syncWatchlist);
  }, [movie.id]);

  const toggleWatchlist = (e) => {
    e.preventDefault(); 
    let list = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (inWatchlist) {
      list = list.filter(m => m.id !== movie.id);
      setInWatchlist(false);
    } else {
      list.push(movie);
      setInWatchlist(true);
    }
    localStorage.setItem('watchlist', JSON.stringify(list));
    window.dispatchEvent(new Event('watchlistUpdated'));
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-wrapper">
         <img src={movie.poster} alt={movie.title} className="movie-poster" />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-meta">
          <span>{movie.year}</span>
          <span className="separator">·</span>
          <span>{movie.genre}</span>
        </p>
        <p className="movie-rating"><span className="star">★</span> {movie.rating}</p>
        <button 
          className={`watchlist-pill ${inWatchlist ? 'saved' : ''}`}
          onClick={toggleWatchlist} 
        >
          {inWatchlist ? 'Saved' : '+ Watchlist'}
        </button>
      </div>
    </Link>
  );
}

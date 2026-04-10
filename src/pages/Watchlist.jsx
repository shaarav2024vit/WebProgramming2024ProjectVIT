import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/Watchlist.css';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(list);

    const handleUpdate = () => {
      const updatedList = JSON.parse(localStorage.getItem('watchlist')) || [];
      setWatchlist(updatedList);
    };

    window.addEventListener('watchlistUpdated', handleUpdate);
    return () => window.removeEventListener('watchlistUpdated', handleUpdate);
  }, []);

  return (
    <div className="watchlist-page">
      <div className="editorial-header">
        <h1>Watchlist</h1>
        <span className="count">{watchlist.length} titles</span>
      </div>

      {watchlist.length > 0 ? (
        <div className="movies-grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Nothing saved yet.</p>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../data/movies';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import '../styles/MovieDetail.css';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find(m => m.id.toString() === id);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(allReviews.filter(r => r.movieId === id));
  }, [id]);

  const handleReviewAdded = (review) => {
    setReviews(prev => [...prev, review]);
  };

  if (!movie) {
    return (
      <div className="not-found">
        <h2>Movie not found.</h2>
        <Link to="/">Return to Browse</Link>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <div className="detail-hero-backdrop">
        <div className="detail-header-content">
          <div className="poster-container">
            <img src={movie.poster} alt={movie.title} className="detail-poster" />
          </div>
          <div className="detail-info">
            <h1>{movie.title}</h1>
            <p className="detail-meta">
              {movie.year} <span className="separator">·</span> {movie.genre} <span className="separator">·</span> {movie.length} <span className="separator">·</span> {movie.language}
              <span className="label">Director:</span> <span className="value">{movie.director}</span>
            </p>
            
            <p className="synopsis">{movie.synopsis}</p>
            
            {movie.trailer && (
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="trailer-link">
                ↗ Watch Trailer
              </a>
            )}

            <div className="cast-section">
              <h3>Cast</h3>
              <div className="cast-list">
                {movie.cast && movie.cast.map((actor, idx) => (
                  <div key={idx} className="cast-card">
                    <span className="cast-name">{actor.name}</span>
                    <span className="cast-role">{actor.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section-wrapper">
        <hr className="divider" />
        <div className="reviews-section">
          <h2>User Reviews</h2>
          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.name}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} readOnly={true} />
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No user reviews yet. Be the first!</p>
          )}

          <ReviewForm movieId={movie.id.toString()} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ id, title, poster, rating, review: desc, delay }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('movies_favorites') || '[]');
        setLiked(favs.some(m => m.id === id));
    }, [id]); // check if this movie is already in favorites on load

    const handleFavorite = (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log("toggling favorite for movie id:", id);

        let favs = JSON.parse(localStorage.getItem('movies_favorites') || '[]');
        if (liked) {
            favs = favs.filter(m => m.id !== id);
        } else {
            favs.push({ id, title, poster, rating, review: desc, delay });
        }

        localStorage.setItem('movies_favorites', JSON.stringify(favs));
        setLiked(!liked);
        window.dispatchEvent(new Event('favoritesUpdated')); // let other components know it changed
    };

    return (
        <div className="movie-card" style={{ animationDelay: delay }}>
            <div className="movie-card-inner">
                <div className="movie-poster-container">
                    <img src={poster} alt={`${title} Poster`} className="movie-poster" />
                    <div className="movie-rating">{rating}</div>
                    <button className={`favorite-btn ${liked ? 'active' : ''}`} onClick={handleFavorite} aria-label="Toggle Favorite">
                        <svg viewBox="0 0 24 24" fill={liked ? "#e50914" : "rgba(0,0,0,0.5)"} stroke={liked ? "#e50914" : "rgba(255, 255, 255, 0.8)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div className="movie-content">
                    <h3 className="movie-title">{title}</h3>
                    <p className="movie-review">{desc}</p>
                    <Link to={`/movie/${id}`} className="read-more-btn">Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

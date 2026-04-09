import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
    const [favMovies, setFavMovies] = useState([]);

    const loadFavs = () => {
        console.log("picking up favorites from storage...");
        const data = JSON.parse(localStorage.getItem('movies_favorites') || '[]');
        setFavMovies(data);
    }; // load the list from local storage

    useEffect(() => {
        loadFavs();

        window.addEventListener('favoritesUpdated', loadFavs);
        return () => window.removeEventListener('favoritesUpdated', loadFavs);
    }, []); // refresh list if something is added/removed elsewhere

    return (
        <main className="main-content" style={{ marginTop: '8rem' }}>
            <section className="movies-section">
                <h2 className="section-title">Your Favorites</h2>
                {favMovies.length > 0 ? (
                    <div className="movies-grid">
                        {favMovies.map((m) => (
                            <MovieCard
                                key={m.id}
                                id={m.id}
                                title={m.title}
                                poster={m.poster}
                                rating={m.rating}
                                review={m.review}
                                delay="0s"
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#a0a0a0', fontSize: '1.2rem' }}>
                        No favorites added yet. Browse movies and click the heart icon to add them to your watchlist!
                    </div>
                )}
            </section>
        </main>
    );
}

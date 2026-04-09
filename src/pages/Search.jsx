import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { featuredMovies, recentlyAdded } from '../data/movies';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const selectedGenre = searchParams.get('genre') || '';

    const allMovies = [...featuredMovies, ...recentlyAdded];

    // Ensure we don't have duplicates based on mapping ID 
    const uniqueMoviesMap = new Map();
    allMovies.forEach(movie => uniqueMoviesMap.set(movie.id, movie));
    const uniqueMovies = Array.from(uniqueMoviesMap.values());

    const genres = useMemo(() => {
        const uniqueGenres = new Set();
        uniqueMovies.forEach(m => {
            if (m.genre) uniqueGenres.add(m.genre);
        });
        return Array.from(uniqueGenres).sort();
    }, [uniqueMovies]);

    const handleGenreSelect = (g) => {
        setSearchParams(prev => {
            if (g) prev.set('genre', g);
            else prev.delete('genre');
            return prev;
        });
    };

    const filteredMovies = useMemo(() => {
        if (!query.trim() && !selectedGenre) return [];
        return uniqueMovies.filter(movie => {
            const matchesQuery = !query || movie.title.toLowerCase().includes(query.toLowerCase()) || movie.review.toLowerCase().includes(query.toLowerCase());
            const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
            return matchesQuery && matchesGenre;
        });
    }, [query, selectedGenre, uniqueMovies]);

    return (
        <main className="main-content" style={{ marginTop: '6rem' }}>
            <section className="movies-section">
                <h2 className="section-title">
                    {query ? `Search Results for "${query}"` : 'Search by Genre'}
                </h2>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                    <button
                        style={{
                            background: selectedGenre === '' ? 'var(--gold-accent)' : 'var(--gold-muted)',
                            color: '#fff', border: '1px solid var(--gold-accent)', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                        onClick={() => handleGenreSelect('')}
                    >
                        All
                    </button>
                    {genres.map(g => (
                        <button
                            key={g}
                            style={{
                                background: selectedGenre === g ? 'var(--gold-accent)' : 'var(--gold-muted)',
                                color: '#fff', border: '1px solid var(--gold-accent)', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                            onClick={() => handleGenreSelect(g)}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                {filteredMovies.length > 0 ? (
                    <div className="movies-grid">
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                poster={movie.poster}
                                rating={movie.rating}
                                review={movie.review}
                                delay="0s"
                            />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '2rem' }}>
                        No movies found matching your criteria.
                    </p>
                )}
            </section>
        </main>
    );
}

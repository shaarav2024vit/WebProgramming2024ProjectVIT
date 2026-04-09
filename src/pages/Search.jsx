import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { mainMovies, newMovies } from '../data/movies';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get('q') || '';
    const activeGenre = searchParams.get('genre') || '';

    const list = [...mainMovies, ...newMovies];

    // Ensure we don't have duplicates based on mapping ID 
    const tempMap = new Map();
    list.forEach(m => tempMap.set(m.id, m));
    const fullList = Array.from(tempMap.values()); // fix duplicates in the list

    const genreList = useMemo(() => {
        const uniqueGenres = new Set();
        fullList.forEach(m => {
            if (m.genre) uniqueGenres.add(m.genre);
        });
        return Array.from(uniqueGenres).sort();
    }, [fullList]);

    const pickGenre = (g) => {
        setSearchParams(prev => {
            if (g) prev.set('genre', g);
            else prev.delete('genre');
            return prev;
        }); // update url when genre is clicked
    };

    const results = useMemo(() => {
        console.log("Searching for:", searchText, "Genre:", activeGenre);
        if (!searchText.trim() && !activeGenre) return [];
        return fullList.filter(m => {
            const matchesQuery = !searchText || m.title.toLowerCase().includes(searchText.toLowerCase()) || m.review.toLowerCase().includes(searchText.toLowerCase());
            const matchesGenre = !activeGenre || m.genre === activeGenre;
            return matchesQuery && matchesGenre;
        });
    }, [searchText, activeGenre, fullList]);

    return (
        <main className="main-content" style={{ marginTop: '6rem' }}>
            <section className="movies-section">
                <h2 className="section-title">
                    {searchText ? `Search Results for "${searchText}"` : 'Search by Genre'}
                </h2>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                    <button
                        style={{
                            background: activeGenre === '' ? 'var(--gold-accent)' : 'var(--gold-muted)',
                            color: '#fff', border: '1px solid var(--gold-accent)', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                        onClick={() => pickGenre('')}
                    >
                        All
                    </button>
                    {genreList.map(g => (
                        <button
                            key={g}
                            style={{
                                background: activeGenre === g ? 'var(--gold-accent)' : 'var(--gold-muted)',
                                color: '#fff', border: '1px solid var(--gold-accent)', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                            onClick={() => pickGenre(g)}
                        >
                            {g}
                        </button>
                    ))}
                </div> {/* genre buttons */}

                {results.length > 0 ? (
                    <div className="movies-grid">
                        {results.map((m) => (
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
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '2rem' }}>
                        No movies found matching your criteria.
                    </p>
                )}
            </section>
        </main>
    );
}

import React from 'react';
import MovieCard from '../components/MovieCard';
import { bestMovies } from '../data/movies';

export default function TopRated() {
    console.log("top rated page loaded!");
    return (
        <main className="main-content" style={{ marginTop: '8rem' }}>
            <section className="movies-section">
                <h2 className="section-title">Top Rated Movies</h2>
                <div className="movies-grid">
                    {bestMovies.map((m) => (
                        <MovieCard
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            poster={m.poster}
                            rating={m.rating}
                            review={m.review}
                            delay={m.delay}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

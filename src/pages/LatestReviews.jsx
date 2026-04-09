import React from 'react';
import MovieCard from '../components/MovieCard';
import { newMovies } from '../data/movies';

export default function LatestReviews() {
    console.log("showing latest reviews...");
    return (
        <main className="main-content" style={{ marginTop: '8rem' }}>
            <section className="movies-section">
                <h2 className="section-title">Latest Reviews</h2>
                <div className="movies-grid">
                    {newMovies.map((m) => (
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

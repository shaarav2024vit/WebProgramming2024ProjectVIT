import React from 'react';
import HeroSection from '../components/HeroSection';
import MovieCard from '../components/MovieCard';
import { mainMovies, newMovies } from '../data/movies';

export default function Home() {
    console.log("Home page is ready...");
    return (
        <main className="main-content">
            <HeroSection />

            <section className="movies-section">
                <h2 className="section-title">Featured Reviews</h2>
                <div className="movies-grid">
                    {mainMovies.map((m) => (
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

            <section className="movies-section">
                <h2 className="section-title">Recently Added</h2>
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

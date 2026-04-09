import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mainMovies, newMovies } from '../data/movies';
import './MovieDetail.css';

export default function MovieDetail() {
    const { id } = useParams();
    const list = [...mainMovies, ...newMovies]; // combine all movie lists
    const info = list.find(m => m.id === parseInt(id)); // find the movie we clicked on

    console.log("Loading details for movie:", id);

    if (!info) {
        return (
            <main className="main-content" style={{ marginTop: '8rem', textAlign: 'center' }}>
                <h2 className="section-title">Movie Not Found</h2>
                <Link to="/" className="back-link">Return Home</Link>
            </main>
        ); // show error if movie doesn't exist
    }

    return (
        <main className="main-content" style={{ marginTop: '7rem', display: 'flex', justifyContent: 'center' }}>
            <div className="movie-detail-container">
                <div className="movie-detail-poster-wrapper">
                    <img src={info.poster} alt={info.title} className="movie-detail-poster" />
                </div>
                <div className="movie-detail-info">
                    <h1 className="movie-detail-title">{info.title}</h1>
                    <div className="movie-detail-meta">
                        <span className="movie-badge">{info.year}</span>
                        <span className="movie-badge">{info.length}</span>
                        <span className="movie-badge">{info.language}</span>
                        <span className="movie-badge highlight">{info.genre}</span>
                    </div>
                    <div className="movie-detail-rating">★ {info.rating}</div> {/* show the star rating */}

                    <div className="movie-director">
                        <span className="director-label">Director:</span> {info.director}
                    </div>

                    {info.trailer && (
                        <a href={info.trailer} target="_blank" rel="noopener noreferrer" className="trailer-btn">
                            <span className="play-icon">▶</span> Watch Trailer
                        </a>
                    )}

                    <p className="movie-detail-description">
                        {info.review}
                        <br /><br />
                        Immerse yourself into the world of {info.title}. With stunning visuals and breathtaking acting, this film takes you on a journey through the perspectives of its deeply written characters.
                    </p>

                    {info.cast && (
                        <div className="movie-cast-section">
                            <h3 className="cast-title">Meet the Cast</h3>
                            <div className="cast-grid">
                                {info.cast.map((person, i) => (
                                    <div key={i} className="cast-member">
                                        <div className="actor-name">{person.name}</div>
                                        <div className="actor-role">{person.role}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Link to="/" className="back-link">&larr; Back Highlights</Link>
                </div>
            </div>
        </main>
    );
}

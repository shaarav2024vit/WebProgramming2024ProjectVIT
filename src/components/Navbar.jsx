import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if a specific genre represents the active path+query
    const isGenreActive = (genre) => {
        const params = new URLSearchParams(location.search);
        return location.pathname === '/search' && params.get('genre') === genre;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <h1 className="navbar-logo">Movie Reviews</h1>
                <nav>
                    <ul className="nav-links">
                        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                        <li><NavLink to="/latest" className={({ isActive }) => (isActive ? 'active' : '')}>Latest Reviews</NavLink></li>
                        <li><NavLink to="/top-rated" className={({ isActive }) => (isActive ? 'active' : '')}>Top Rated</NavLink></li>
                        <li><NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>Favorites</NavLink></li>
                        <li className="dropdown">
                            <span className="dropbtn">Genres ▼</span>
                            <div className="dropdown-content">
                                <NavLink to="/search?genre=Action" className={() => isGenreActive('Action') ? 'active' : ''}>Action</NavLink>
                                <NavLink to="/search?genre=Sci-Fi" className={() => isGenreActive('Sci-Fi') ? 'active' : ''}>Sci-Fi</NavLink>
                                <NavLink to="/search?genre=Thriller" className={() => isGenreActive('Thriller') ? 'active' : ''}>Thriller</NavLink>
                                <NavLink to="/search?genre=Adventure" className={() => isGenreActive('Adventure') ? 'active' : ''}>Adventure</NavLink>
                                <NavLink to="/search?genre=Crime" className={() => isGenreActive('Crime') ? 'active' : ''}>Crime</NavLink>
                                <NavLink to="/search?genre=Drama" className={() => isGenreActive('Drama') ? 'active' : ''}>Drama</NavLink>
                            </div>
                        </li>
                    </ul>
                </nav>
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </div>
        </header>
    );
};

export default Navbar;

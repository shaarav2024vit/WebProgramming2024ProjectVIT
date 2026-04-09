import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [navBg, setNavBg] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [totalPopcorn, setTotalPopcorn] = useState(() => {
        const saved = localStorage.getItem('popcorn_count');
        return parseInt(saved || '0');
    });

    const hitPopcorn = () => {
        console.log('popcorn clicked!!');
        const num = totalPopcorn + 1;
        setTotalPopcorn(num);
        localStorage.setItem('popcorn_count', num.toString());
    }; // keep track of the popcorn we "eat"

    // Helper to check if a specific genre represents the active path+query
    const isActiveGenre = (g) => {
        const p = new URLSearchParams(location.search);
        return location.pathname === '/search' && p.get('genre') === g;
    }; // check if the genre we're looking at is the one from the URL

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setNavBg(true);
            } else {
                setNavBg(false);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []); // add scroll listener when component mounts

    const onSearchSubmit = (event) => {
        event.preventDefault(); // stop page from reloading
        if (searchTxt.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTxt)}`);
            setSearchTxt('');
        }
    };

    return (
        <header className={`navbar ${navBg ? 'scrolled' : ''}`}>
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
                                <NavLink to="/search?genre=Action" className={() => isActiveGenre('Action') ? 'active' : ''}>Action</NavLink>
                                <NavLink to="/search?genre=Sci-Fi" className={() => isActiveGenre('Sci-Fi') ? 'active' : ''}>Sci-Fi</NavLink>
                                <NavLink to="/search?genre=Thriller" className={() => isActiveGenre('Thriller') ? 'active' : ''}>Thriller</NavLink>
                                <NavLink to="/search?genre=Adventure" className={() => isActiveGenre('Adventure') ? 'active' : ''}>Adventure</NavLink>
                                <NavLink to="/search?genre=Crime" className={() => isActiveGenre('Crime') ? 'active' : ''}>Crime</NavLink>
                                <NavLink to="/search?genre=Drama" className={() => isActiveGenre('Drama') ? 'active' : ''}>Drama</NavLink>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="popcorn-container" onClick={hitPopcorn} title="Get Popcorn!">
                    <span className="popcorn-icon">🍿</span>
                    <span className="popcorn-count">{totalPopcorn}</span>
                </div>
                <form className="search-form" onSubmit={onSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTxt}
                        onChange={(e) => setSearchTxt(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </div>
        </header>
    );
};

export default Navbar;

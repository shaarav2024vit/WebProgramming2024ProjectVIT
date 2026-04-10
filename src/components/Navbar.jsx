import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="site-brand">
          Minimal Movie Reviews.
        </Link>
        <div className="nav-links">
          <Link to="/">Browse</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>
      </div>
    </nav>
  );
}

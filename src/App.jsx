import React from 'react'; // standard react import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import LatestReviews from './pages/LatestReviews';
import TopRated from './pages/TopRated';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

// this is the main app component with all the routes

function MovieReviewsApp() {
    console.log("Movie App loading...");
    return (
        <Router>
            <div className="app-container">

                <Navbar /> {/* global nav bar */}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/latest" element={<LatestReviews />} />
                    <Route path="/top-rated" element={<TopRated />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}

export default MovieReviewsApp;

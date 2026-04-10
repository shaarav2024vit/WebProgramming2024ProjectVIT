import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import NotFound from './pages/NotFound';
import PopcornClicker from './components/PopcornClicker';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PopcornClicker />
    </>
  );
}

export default App;

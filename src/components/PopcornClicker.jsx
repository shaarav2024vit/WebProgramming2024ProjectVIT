import { useState, useEffect } from 'react';
import '../styles/PopcornClicker.css';

export default function PopcornClicker() {
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem('popcornCount')) || 0;
  });
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('popcornCount', count.toString());
  }, [count]);

  const handleClick = () => {
    setCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);
  };

  return (
    <div className={`popcorn-clicker ${isAnimating ? 'bump' : ''}`} onClick={handleClick} title="Dopamine Hit">
      <span className="popcorn-icon">🍿</span>
      <span className="popcorn-count">{count}</span>
    </div>
  );
}

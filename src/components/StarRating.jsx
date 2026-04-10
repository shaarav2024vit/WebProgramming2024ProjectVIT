import { useState } from 'react';
import '../styles/StarRating.css';

export default function StarRating({ rating, setRating, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className={`star-rating ${readOnly ? 'readonly' : ''}`}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => !readOnly && setRating && setRating(index)}
            onMouseEnter={() => !readOnly && setHover(index)}
            onMouseLeave={() => !readOnly && setHover(rating)}
            disabled={readOnly}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

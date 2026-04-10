import { useState } from 'react';
import StarRating from './StarRating';
import '../styles/ReviewForm.css';

export default function ReviewForm({ movieId, onReviewAdded }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text || rating === 0) return;

    const newReview = {
      id: Date.now().toString(),
      movieId,
      name,
      rating,
      text,
      date: new Date().toLocaleDateString()
    };

    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    existingReviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    onReviewAdded(newReview);
    setName('');
    setRating(0);
    setText('');
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Your name"
        />
      </div>

      <div className="form-group rating-group">
        <label>Rating</label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="form-group">
        <label htmlFor="text">Review</label>
        <textarea 
          id="text" 
          rows="4" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you think of the movie?"
        ></textarea>
      </div>

      <button type="submit" className="submit-btn" disabled={!name || !text || rating === 0}>
        Submit Review
      </button>
    </form>
  );
}

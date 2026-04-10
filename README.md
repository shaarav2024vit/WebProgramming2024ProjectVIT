# 🎬 WebProgramming2026ProjectVIT

**BCSE203E – Web Programming Project**  
**Name:** Shaarav S  
**Register Number:** 24BYB0118  

## 🛠️ Tech Stack

- React.js  
- Vite  
- React Router DOM  
- JavaScript (ES6+)  
- CSS3  

# Movie Review Web Application

This project is a Movie Review Web Application built as part of the Web Programming 2024 course at VIT. Using React.js, it transforms a static UI into a fully dynamic and interactive platform where users can browse, search, and explore movie reviews — all without full page reloads, thanks to smooth client-side navigation and real-time UI updates.

## React

- `useState` manages interactive state across the app, while `useEffect` handles side effects like data loading and scroll detection
- Props are being used for sending data between parent and child
- Uses React Router to handle dynamic client-side routing across pages like `/`, `/latest`, `/top-rated`, `/movie/:id`, and `/search`
- Users can navigate seamlessly between pages using `useNavigate`, with search results tied to URL query parameters via `useSearchParams`
- Movie detail pages render conditionally based on the route parameter, showing only what's relevant to the selected movie

## JavaScript

- Search works in real time with case-insensitive filtering, so users get results as they type
- Movies are organized into and sorted according to the user using array methods
- Search queries are synced with the URL, making results easy to bookmark or share
- All movie data lives in a single local `movies.js` file

## CSS

- A bold Hero section greets users on the home page, setting the visual tone of the app
- Movie cards respond to hover with smooth animations, making browsing feel engaging and fluid
- The navbar updates dynamically based on scroll position, giving the app a polished, app-like feel
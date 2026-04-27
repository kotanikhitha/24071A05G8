import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MOVIES = [
  { id: 1, title: 'Galactic Storm', genre: 'Sci-Fi', rating: '⭐ 8.4', duration: '2h 18m', price: 180, emoji: '🚀' },
  { id: 2, title: 'Shadow Kingdom', genre: 'Action', rating: '⭐ 7.9', duration: '2h 05m', price: 160, emoji: '⚔️' },
  { id: 3, title: 'Love in Paris', genre: 'Romance', rating: '⭐ 7.2', duration: '1h 55m', price: 140, emoji: '💕' },
  { id: 4, title: 'The Last Forest', genre: 'Drama', rating: '⭐ 8.1', duration: '2h 10m', price: 150, emoji: '🌳' },
  { id: 5, title: 'Dark Waters', genre: 'Thriller', rating: '⭐ 8.6', duration: '1h 48m', price: 170, emoji: '🌊' },
  { id: 6, title: 'Laugh Out Loud', genre: 'Comedy', rating: '⭐ 7.0', duration: '1h 40m', price: 130, emoji: '😂' },
]

export default function MovieList({ user, setUser, setBooking }) {
  const navigate = useNavigate()

  const handleBook = (movie) => {
    setBooking({ movie, seats: [], totalAmount: 0 })
    navigate('/seats')
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} navigate={navigate} />
      <div className="page">
        <h1 className="page-title">Now Showing</h1>
        <p className="page-subtitle">Choose a movie to get started</p>

        <div className="movies-grid">
          {MOVIES.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">{movie.emoji}</div>
              <div className="movie-card-body">
                <h3>{movie.title}</h3>
                <div className="genre">{movie.genre}</div>
                <div className="meta">{movie.rating} &nbsp;·&nbsp; {movie.duration}</div>
                <div className="meta">₹{movie.price} / seat</div>
                <button
                  id={`book-${movie.id}`}
                  className="btn-book"
                  onClick={() => handleBook(movie)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

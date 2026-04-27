import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Steps from '../components/Steps'

export default function Confirmation({ user, setUser, booking, setBooking }) {
  const navigate = useNavigate()

  if (!booking.movie) { navigate('/'); return null }

  const handleGoHome = () => {
    // Reset booking and go back to movie list
    setBooking({})
    navigate('/')
  }

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
  const showTime = '07:30 PM'

  return (
    <>
      <Navbar user={user} setUser={setUser} navigate={navigate} />
      <div className="page">
        <Steps steps={['Movies', 'Seats', 'Payment', 'Confirm']} current={3} />

        <div className="confirm-wrapper">
          <div className="confirm-card">
            <div className="tick-icon">✓</div>
            <p className="booking-id">BOOKING ID: {booking.bookingId}</p>
            <h2>Booking Confirmed!</h2>
            <p className="sub">
              Your tickets are booked. Enjoy the show! 🍿
            </p>

            <div className="ticket-info">
              <div className="ticket-row">
                <span>Movie</span>
                <span>{booking.movie.emoji} {booking.movie.title}</span>
              </div>
              <div className="ticket-row">
                <span>Genre</span>
                <span>{booking.movie.genre}</span>
              </div>
              <div className="ticket-row">
                <span>Seats</span>
                <span>{booking.seats?.join(', ')}</span>
              </div>
              <div className="ticket-row">
                <span>Date</span>
                <span>{today}</span>
              </div>
              <div className="ticket-row">
                <span>Show Time</span>
                <span>{showTime}</span>
              </div>
              <div className="ticket-row">
                <span>Payment</span>
                <span>{booking.paymentMethod}</span>
              </div>
              <div className="ticket-row">
                <span>Amount Paid</span>
                <span>₹{booking.totalAmount + 30}</span>
              </div>
            </div>

            <button id="go-home-btn" className="btn-home" onClick={handleGoHome}>
              🏠 Back to Movies
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

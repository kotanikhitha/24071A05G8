import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Steps from '../components/Steps'

// Pre-booked seats (simulated)
const BOOKED = ['A3', 'A4', 'B7', 'C2', 'C3', 'D5', 'E1', 'E8']

const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLS = [1, 2, 3, 4, 5, 6, 7, 8]

const SECTIONS = [
  { label: 'Premium (₹+50)', rows: ['A', 'B'] },
  { label: 'Standard', rows: ['C', 'D', 'E'] },
]

export default function SeatSelection({ user, setUser, booking, setBooking }) {
  const navigate = useNavigate()
  const [selectedSeats, setSelectedSeats] = useState([])

  if (!booking.movie) {
    navigate('/')
    return null
  }

  const toggleSeat = (seatId) => {
    if (BOOKED.includes(seatId)) return
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    )
  }

  const pricePerSeat = booking.movie.price
  const total = selectedSeats.length * pricePerSeat

  const handleProceed = () => {
    setBooking((prev) => ({ ...prev, seats: selectedSeats, totalAmount: total }))
    navigate('/payment')
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} navigate={navigate} />
      <div className="page">
        <Steps steps={['Movies', 'Seats', 'Payment', 'Confirm']} current={1} />

        <h1 className="page-title">Select Seats</h1>
        <p className="page-subtitle">Click on an available seat to select it</p>

        {/* Movie info banner */}
        <div className="movie-banner">
          <div className="banner-emoji">{booking.movie.emoji}</div>
          <div>
            <h3>{booking.movie.title}</h3>
            <p>{booking.movie.genre} &nbsp;·&nbsp; {booking.movie.duration} &nbsp;·&nbsp; ₹{booking.movie.price}/seat</p>
          </div>
        </div>

        {/* Screen */}
        <div className="screen-bar">◀ ── SCREEN ── ▶</div>

        {/* Seat grid by section */}
        {SECTIONS.map((section) => (
          <div key={section.label} className="seats-section">
            <h4>{section.label}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {section.rows.map((row) => (
                <div key={row} className="seats-row">
                  <span style={{ width: '20px', color: '#64748b', fontSize: '0.78rem', marginRight: '4px', lineHeight: '32px' }}>{row}</span>
                  {COLS.map((col) => {
                    const id = `${row}${col}`
                    const isBooked = BOOKED.includes(id)
                    const isSelected = selectedSeats.includes(id)
                    return (
                      <div
                        key={id}
                        id={`seat-${id}`}
                        className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                        onClick={() => toggleSeat(id)}
                        title={isBooked ? 'Already booked' : id}
                      >
                        {col}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="seat-legend">
          <div className="legend-item"><div className="legend-box av" /> Available</div>
          <div className="legend-item"><div className="legend-box sel" /> Selected</div>
          <div className="legend-item"><div className="legend-box bk" /> Booked</div>
        </div>

        {/* Summary */}
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <div className="summary-row">
            <span>Movie</span><span>{booking.movie.title}</span>
          </div>
          <div className="summary-row">
            <span>Seats</span>
            <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : '—'}</span>
          </div>
          <div className="summary-row">
            <span>Price per seat</span><span>₹{pricePerSeat}</span>
          </div>
          <div className="summary-row">
            <span>Total Amount</span><span>₹{total}</span>
          </div>
          <button
            id="proceed-payment-btn"
            className="btn-proceed"
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
          >
            {selectedSeats.length === 0
              ? 'Select at least 1 seat'
              : `Proceed to Payment → ₹${total}`}
          </button>
        </div>
      </div>
    </>
  )
}

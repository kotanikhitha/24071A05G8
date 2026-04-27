import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Steps from '../components/Steps'

const PAYMENT_METHODS = ['💳 Card', '📱 UPI', '🏦 Net Banking', '💰 Wallet']

export default function Payment({ user, setUser, booking, setBooking }) {
  const navigate = useNavigate()
  const [method, setMethod] = useState('💳 Card')
  const [form, setForm] = useState({ name: '', cardNumber: '', expiry: '', cvv: '', upi: '' })
  const [errors, setErrors] = useState({})

  if (!booking.movie) { navigate('/'); return null }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const errs = {}
    if (method === '💳 Card') {
      if (!form.name.trim()) errs.name = 'Name is required'
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) errs.cardNumber = 'Enter valid 16-digit card number'
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errs.expiry = 'Format: MM/YY'
      if (!/^\d{3}$/.test(form.cvv)) errs.cvv = 'Enter 3-digit CVV'
    } else if (method === '📱 UPI') {
      if (!form.upi.includes('@')) errs.upi = 'Enter valid UPI ID (e.g. name@upi)'
    }
    return errs
  }

  const handlePay = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    // Generate booking ID and navigate to confirmation
    const bookingId = 'CB' + Math.random().toString(36).substr(2, 8).toUpperCase()
    setBooking((prev) => ({ ...prev, bookingId, paymentMethod: method }))
    navigate('/confirmation')
  }

  const convenienceFee = 30
  const total = booking.totalAmount + convenienceFee

  return (
    <>
      <Navbar user={user} setUser={setUser} navigate={navigate} />
      <div className="page">
        <Steps steps={['Movies', 'Seats', 'Payment', 'Confirm']} current={2} />

        <h1 className="page-title">Payment</h1>
        <p className="page-subtitle">Complete your booking securely</p>

        <div className="payment-layout">
          {/* Left — Payment Form */}
          <div className="payment-form">
            <h3>Choose Payment Method</h3>
            <div className="pay-methods">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  id={`pay-method-${m.replace(/\s/g, '-')}`}
                  className={`pay-method ${method === m ? 'active' : ''}`}
                  onClick={() => setMethod(m)}
                  type="button"
                >
                  {m}
                </button>
              ))}
            </div>

            <form onSubmit={handlePay}>
              {method === '💳 Card' && (
                <>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input name="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={handleChange} />
                    {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry (MM/YY)</label>
                      <input name="expiry" placeholder="08/27" maxLength={5} value={form.expiry} onChange={handleChange} />
                      {errors.expiry && <span className="error-msg">{errors.expiry}</span>}
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input name="cvv" placeholder="•••" maxLength={3} type="password" value={form.cvv} onChange={handleChange} />
                      {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
                    </div>
                  </div>
                </>
              )}

              {method === '📱 UPI' && (
                <div className="form-group">
                  <label>UPI ID</label>
                  <input name="upi" placeholder="yourname@upi" value={form.upi} onChange={handleChange} />
                  {errors.upi && <span className="error-msg">{errors.upi}</span>}
                </div>
              )}

              {(method === '🏦 Net Banking' || method === '💰 Wallet') && (
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
                  You will be redirected to your {method === '🏦 Net Banking' ? 'bank' : 'wallet'} portal to complete payment.
                </p>
              )}

              <button id="pay-now-btn" type="submit" className="btn-pay">
                🔒 Pay ₹{total} Now
              </button>
            </form>
          </div>

          {/* Right — Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-movie">{booking.movie.emoji} {booking.movie.title}</div>
            <div className="order-row"><span>Seats</span><span>{booking.seats?.join(', ')}</span></div>
            <div className="order-row"><span>Tickets ({booking.seats?.length})</span><span>₹{booking.totalAmount}</span></div>
            <div className="order-row"><span>Convenience Fee</span><span>₹{convenienceFee}</span></div>
            <div className="order-row"><span>Total</span><span>₹{total}</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

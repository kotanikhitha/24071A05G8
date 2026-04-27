import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Demo credentials
const VALID_USER = { email: 'user@cinebook.com', password: '123456', name: 'Movie Fan' }

export default function Login({ setUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (email === VALID_USER.email && password === VALID_USER.password) {
      setUser({ email: VALID_USER.email, name: VALID_USER.name })
      navigate('/')
    } else {
      setError('Invalid email or password. Try the demo credentials below.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-brand">🎬 CineBook</div>
        <h2>Welcome back!</h2>
        <p className="sub">Sign in to book your movie tickets</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button id="login-btn" type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        <p className="hint">
          Demo: <strong>user@cinebook.com</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  )
}

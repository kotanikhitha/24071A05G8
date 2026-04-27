import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import MovieList from './pages/MovieList'
import SeatSelection from './pages/SeatSelection'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'

export default function App() {
  const [user, setUser] = useState(null)           // logged-in user
  const [booking, setBooking] = useState({})        // shared booking state

  // Simple auth guard
  const PrivateRoute = ({ children }) =>
    user ? children : <Navigate to="/login" replace />

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protected */}
        <Route path="/" element={
          <PrivateRoute>
            <MovieList user={user} setUser={setUser} setBooking={setBooking} />
          </PrivateRoute>
        } />
        <Route path="/seats" element={
          <PrivateRoute>
            <SeatSelection user={user} setUser={setUser} booking={booking} setBooking={setBooking} />
          </PrivateRoute>
        } />
        <Route path="/payment" element={
          <PrivateRoute>
            <Payment user={user} setUser={setUser} booking={booking} setBooking={setBooking} />
          </PrivateRoute>
        } />
        <Route path="/confirmation" element={
          <PrivateRoute>
            <Confirmation user={user} setUser={setUser} booking={booking} setBooking={setBooking} />
          </PrivateRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

// Shared Navbar used across all protected pages
export default function Navbar({ user, setUser, navigate }) {
  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="logo">🎬 CineBook</div>
      <div className="user-info">
        <span>👤 {user?.name}</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

import './Header.css'

function Header({ user, onLogout }) {
  return (
    <header className="header glass-panel">
      <div className="header-logo">
        <span className="logo-emoji">🌿</span>
        <h1 className="logo-text">GreenPastures</h1>
      </div>

      <nav className="header-nav">
        {user ? (
          <div className="user-status">
            <span className="user-welcome">Welcome, <strong>{user.name}</strong></span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <span className="guest-msg">Join our community</span>
        )}
      </nav>
    </header>
  )
}

export default Header
import { useLocation, useNavigate, Link } from 'react-router-dom'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png'

const MAIN_PAGES = ['/', '/dashboard', '/guides', '/earn', '/apps', '/favorites', '/tools']

interface HeaderProps {
  onMenuOpen: () => void
}

export default function Header(_: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isMainPage = MAIN_PAGES.includes(location.pathname)

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <header className="site-header">
      {/* Brand — desktop only, shown via CSS */}
      <Link to="/dashboard" className="brand" aria-label="Home">
        <img src={LOGO_URL} alt="logo" className="brand-logo" width={28} height={28} />
        <span className="brand-name">925 ADHD</span>
      </Link>

      <div style={{ flex: 1, minWidth: 8 }} />

      {/* Back button — mobile only, hidden on main pages */}
      {!isMainPage && (
        <button className="back-arrow-btn" aria-label="Go back" onClick={handleBack}>←</button>
      )}
    </header>
  )
}

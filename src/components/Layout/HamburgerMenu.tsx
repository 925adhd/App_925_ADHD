import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png'

const MENU_ITEMS = [
  { to: '/favorites',  label: 'Saved' },
  { to: '/guides',     label: 'Guides' },
  { to: '/adhd-hacks', label: 'ADHD Hacks' },
  { to: '/playlist',   label: 'Motivation Playlist' },
  { to: '/feedback',   label: 'Feedback' },
]

interface HamburgerMenuProps {
  open: boolean
  onClose: () => void
}

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    onClose()
    await signOut()
    navigate('/')
  }

  return (
    <div
      id="hamburgerOverlay"
      className={`hamburger-overlay${open ? ' open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="hamburger-panel" role="dialog" aria-label="Menu">
        {/* Header */}
        <div className="hamburger-header">
          <Link to="/dashboard" className="hamburger-brand" onClick={onClose} aria-label="Home">
            <img src={LOGO_URL} alt="logo" className="brand-logo" width={28} height={28} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            <span className="brand-name">925 ADHD</span>
          </Link>
          <button className="top-close-btn" aria-label="Close menu" onClick={onClose}>✕</button>
        </div>

        {/* Menu items */}
        {MENU_ITEMS.map(({ to, label }) => (
          <Link key={to} to={to} className="nav-item" onClick={onClose}>
            <span>{label}</span>
          </Link>
        ))}

        <ThemeToggle variant="hamburger" />

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.04)', margin: '10px 0' }} />

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

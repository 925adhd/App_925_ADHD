import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LogOut } from 'lucide-react'
import ThemeToggle from '../ThemeToggle'
import { NAV_SECTIONS } from '../../config/nav'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png'

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

        {/* Nav sections — "Main" is skipped on mobile because BottomNav covers those items */}
        <nav className="hamburger-nav">
          {NAV_SECTIONS.filter(s => s.label !== 'Main').map((section) => (
            <div key={section.label} className="hamburger-section">
              <span className="hamburger-section-label">{section.label}</span>
              {section.items.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `hamburger-link${isActive ? ' active' : ''}`}
                  onClick={onClose}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <ThemeToggle variant="hamburger" />

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

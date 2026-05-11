import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LogOut } from 'lucide-react'
import ThemeToggle from '../ThemeToggle'
import { NAV_SECTIONS } from '../../config/nav'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png'

export default function Sidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="sidebar-brand">
        <img src={LOGO_URL} alt="logo" className="sidebar-logo" width={32} height={32} />
        <span className="sidebar-name">925 ADHD</span>
      </Link>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section, i) => (
          <div key={section.label} className="sidebar-section">
            {i > 0 && <div className="sidebar-divider" aria-hidden />}
            {section.items.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-foot">
        <ThemeToggle variant="sidebar" />
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={14} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}

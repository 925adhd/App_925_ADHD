import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', icon: '/images/home.png',  label: 'Home'   },
  { to: '/earn',      icon: '/images/earn.png',  label: 'Earn'   },
  { to: '/apps',      icon: '/images/apps.png',  label: 'Apps'   },
  { to: '/tools',     icon: '/images/toolsicon.png', label: 'Tools'  },
]

interface BottomNavProps {
  onMenuOpen: () => void
}

export default function BottomNav({ onMenuOpen }: BottomNavProps) {
  return (
    <nav className="site-nav">
      <div className="nav-items">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <img src={icon} className="nav-icon" alt={label} />
            <span>{label}</span>
          </NavLink>
        ))}

        <button
          className="nav-item nav-more"
          onClick={onMenuOpen}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="nav-more-dots">···</span>
          <span>More</span>
        </button>
      </div>
    </nav>
  )
}

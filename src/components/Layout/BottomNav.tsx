import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', icon: '/images/home.png',        label: 'Home'      },
  { to: '/guides',    icon: '/images/guidesicon.webp', label: 'Guides'    },
  { to: '/earn',      icon: '/images/earn.png',        label: 'Earn'      },
  { to: '/saved',     icon: '/images/hearticon.png',   label: 'Favorites' },
  { to: '/tools',     icon: '/images/toolsicon.png',   label: 'Tools'     },
]

export default function BottomNav() {
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
      </div>
    </nav>
  )
}

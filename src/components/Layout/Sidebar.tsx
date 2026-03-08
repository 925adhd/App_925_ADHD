import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  Home,
  BookOpen,
  Coins,
  LayoutGrid,
  Heart,
  Wrench,
  Bot,
  ListChecks,
  Music,
  MessageSquare,
  Brain,
  LogOut,
} from 'lucide-react'
import ThemeToggle from '../ThemeToggle'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png'

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { to: '/dashboard',     icon: Home,       label: 'Home' },
      { to: '/earn',           icon: Coins,      label: 'Earn' },
      { to: '/guides',         icon: BookOpen,   label: 'Guides' },
      { to: '/apps',           icon: LayoutGrid, label: 'Apps' },
      { to: '/favorites',      icon: Heart,      label: 'Saved' },
      { to: '/tools',          icon: Wrench,     label: 'Tools' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { to: '/beginner-list',  icon: ListChecks, label: 'Beginner List' },
      { to: '/ai-playground',  icon: Bot,        label: 'AI Playground' },
      { to: '/adhd-hacks',     icon: Brain,      label: 'ADHD Hacks' },
      { to: '/playlist',       icon: Music,      label: 'Playlist' },
    ],
  },
  {
    label: 'Other',
    items: [
      { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    ],
  },
]

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
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="sidebar-section">
            <span className="sidebar-section-label">{section.label}</span>
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

      <ThemeToggle variant="sidebar" />

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  )
}

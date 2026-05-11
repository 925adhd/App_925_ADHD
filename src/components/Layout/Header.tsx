import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png'

const MAIN_PAGES = ['/', '/dashboard', '/guides', '/earn', '/tools']

const BACK_FALLBACK: Record<string, string> = {
  '/gig-detail':          '/earn',
  '/data-annotation':     '/earn',
  '/mystery-shopping':    '/earn',
  '/social-media-guide':  '/earn',
  '/surveys-guide':       '/earn',
  '/transcription-guide': '/earn',
  '/beginner-list':       '/earn',
  '/daily-flow':          '/tools',
  '/freelance-calc':      '/tools',
  '/sleep-calc':          '/tools',
  '/receipt-stacker':     '/tools',
  '/breathwork':          '/tools',
  '/mindshift':           '/tools',
  '/playlist':            '/tools',
  '/essentials':          '/tools',
  '/gig-tracker':         '/tools',
  '/passion-finder':      '/tools',
  '/adhd-hacks':          '/dashboard',
  '/crypto-made-simple':  '/dashboard',
  '/feedback':            '/dashboard',
  '/start':               '/dashboard',
  '/ai-playground':       '/dashboard',
  '/saved':               '/dashboard',
}

interface HeaderProps {
  onMenuOpen: () => void
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const showBack = !MAIN_PAGES.includes(location.pathname)

  const handleBack = () => {
    // location.key === 'default' means the user landed here directly (refresh / deep link)
    // and there's no SPA history to pop. Use the static fallback in that case.
    if (location.key !== 'default') {
      navigate(-1)
    } else {
      navigate(BACK_FALLBACK[location.pathname] ?? '/dashboard')
    }
  }

  return (
    <header className="site-header">
      {/* Hamburger — mobile only, shown via CSS */}
      <button className="menu-btn" onClick={onMenuOpen} aria-label="Open menu">
        ☰
      </button>

      {/* Brand — desktop only, shown via CSS */}
      <Link to="/dashboard" className="brand" aria-label="Home">
        <img src={LOGO_URL} alt="logo" className="brand-logo" width={28} height={28} />
        <span className="brand-name">925 ADHD</span>
      </Link>

      <div style={{ flex: 1, minWidth: 8 }} />

      {/* Back button — mobile only, replaces theme toggle (which is in the hamburger menu) */}
      {showBack && (
        <button className="header-back-btn" onClick={handleBack} aria-label="Go back">
          <IconArrowLeft size={18} stroke={2} />
          <span>Back</span>
        </button>
      )}
    </header>
  )
}

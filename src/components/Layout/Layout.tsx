import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import HamburgerMenu from './HamburgerMenu'
import Sidebar from './Sidebar'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Toggle body class for CSS (hides logo while menu is open)
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    document.body.classList.add('has-site-layout')
    return () => { document.body.classList.remove('menu-open') }
  }, [menuOpen])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <BottomNav onMenuOpen={() => setMenuOpen(true)} />
    </>
  )
}

import { BsSun, BsMoon } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'

interface ThemeToggleProps {
  variant?: 'sidebar' | 'hamburger'
}

export default function ThemeToggle({ variant = 'sidebar' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={variant === 'hamburger' ? 'hamburger-theme-btn' : 'sidebar-theme-btn'}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <BsSun size={16} /> : <BsMoon size={16} />}
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}

import { BsSun, BsMoon } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'

interface ThemeToggleProps {
  variant?: 'sidebar' | 'hamburger'
}

const CLASS_MAP = {
  sidebar: 'sidebar-theme-btn',
  hamburger: 'hamburger-theme-btn',
}

export default function ThemeToggle({ variant = 'sidebar' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={CLASS_MAP[variant]}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <BsSun size={16} /> : <BsMoon size={16} />}
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}

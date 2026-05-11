import { useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

/** Pages that should restore their scroll position when returned to */
const RESTORE_PAGES = ['/earn', '/tools', '/dashboard', '/guides', '/beginner-list']

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const prevPath = useRef(pathname)
  const restoringRef = useRef(false)

  // Continuously save scroll position while on a restorable page
  // but NOT while a restore is in progress
  const saveScroll = useCallback(() => {
    if (!restoringRef.current && RESTORE_PAGES.includes(pathname)) {
      sessionStorage.setItem(`scroll_${pathname}`, String(window.scrollY))
    }
  }, [pathname])

  useEffect(() => {
    if (!RESTORE_PAGES.includes(pathname)) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          saveScroll()
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, saveScroll])

  // On route change: restore or scroll to top
  useEffect(() => {
    const prev = prevPath.current
    prevPath.current = pathname

    if (prev === pathname) return

    if (RESTORE_PAGES.includes(pathname)) {
      const saved = sessionStorage.getItem(`scroll_${pathname}`)
      if (saved) {
        const y = parseInt(saved, 10)
        sessionStorage.removeItem(`scroll_${pathname}`)
        restoringRef.current = true

        // Retry scroll until content is tall enough or we give up
        let attempts = 0
        const maxAttempts = 15
        const tryRestore = () => {
          window.scrollTo(0, y)
          attempts++
          if (Math.abs(window.scrollY - y) > 5 && attempts < maxAttempts) {
            requestAnimationFrame(tryRestore)
          } else {
            restoringRef.current = false
          }
        }
        requestAnimationFrame(tryRestore)
        return
      }
    }

    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

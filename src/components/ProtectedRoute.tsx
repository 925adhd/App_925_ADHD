import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

// True only during `npm run dev` — automatically false in production builds
const DEV_BYPASS = import.meta.env.DEV

const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0F0F0F' }}>
    <div style={{ color: '#56C3AE', fontSize: '18px' }}>Loading...</div>
  </div>
)

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  // In dev, skip the paid check entirely
  const [accessChecked, setAccessChecked] = useState(DEV_BYPASS)

  useEffect(() => {
    if (DEV_BYPASS || authLoading || !session) return
    supabase
      .from('Paid')
      .select('status')
      .eq('email', session.user.email!.toLowerCase())
      .eq('status', 'active')
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          supabase.auth.signOut().then(() =>
            navigate('/', { replace: true, state: { error: 'no-access' } })
          )
        } else {
          setAccessChecked(true)
        }
      })
  }, [session, authLoading, navigate])

  if (DEV_BYPASS) return <>{children}</>
  if (authLoading) return <LoadingScreen />
  if (!session) return <Navigate to="/" replace />
  if (!accessChecked) return <LoadingScreen />

  return <>{children}</>
}

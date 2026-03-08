import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // True only during `npm run dev` — automatically false in production builds
  const DEV_BYPASS = import.meta.env.DEV

  const { session, loading } = useAuth()

  if (DEV_BYPASS) return <>{children}</>

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0F0F0F' }}>
        <div style={{ color: '#56C3AE', fontSize: '18px' }}>Loading...</div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

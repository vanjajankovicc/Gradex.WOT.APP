import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, dozvoljeneUloge }) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) return <Navigate to="/prijava" replace />

  if (dozvoljeneUloge && !dozvoljeneUloge.includes(user.uloga)) {
    return <Navigate to="/app" replace />
  }

  return children
}

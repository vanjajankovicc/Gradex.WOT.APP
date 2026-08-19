import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import PublicLayout from './layouts/PublicLayout'
import AppLayout from './layouts/AppLayout'

import Landing from './pages/Landing'
import Kontakt from './pages/Kontakt'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

import Dashboard from './pages/app/Dashboard'
import GradilistaList from './pages/app/GradilistaList'
import GradilisteDetail from './pages/app/GradilisteDetail'
import Profil from './pages/app/Profil'
import Admin from './pages/app/Admin'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Route>

        <Route path="/prijava" element={<Login />} />
        <Route path="/registracija" element={<Register />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="gradilista" element={<GradilistaList />} />
          <Route path="gradilista/:id" element={<GradilisteDetail />} />
          <Route path="profil" element={<Profil />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute dozvoljeneUloge={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

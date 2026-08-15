import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import AppTopbar from '../components/AppTopbar'

const NASLOVI = {
  '/app': 'Pregled',
  '/app/gradilista': 'Gradilišta',
  '/app/profil': 'Moj profil',
  '/app/admin': 'Administracija',
}

function nadjiNaslov(pathname) {
  if (NASLOVI[pathname]) return NASLOVI[pathname]
  if (pathname.startsWith('/app/gradilista/')) return 'Detalji gradilišta'
  return 'Gradex'
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-paper bg-grid-paper bg-grid">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <AppTopbar onMenuClick={() => setSidebarOpen(true)} naslov={nadjiNaslov(location.pathname)} />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

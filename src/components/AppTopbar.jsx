import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, LogOut, ChevronDown, RefreshCw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { inicijali, nazivUloge } from '../data/uloge'

export default function AppTopbar({ onMenuClick, naslov }) {
  const { user, logout, demoLogin } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between border-b border-ink/10 bg-paper/95 backdrop-blur px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 -ml-2 text-ink"
          onClick={onMenuClick}
          aria-label="Otvori meni"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-display font-semibold text-ink text-lg">{naslov}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Demo prekidač uloga — pomaže odbrani projekta da prikaže sve poglede bez odjave/prijave */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setDemoOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-md border border-ink/15 px-3 py-1.5 text-xs font-mono text-ink/70 hover:bg-ink/5"
          >
            <RefreshCw size={13} /> Demo uloga
          </button>
          {demoOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-ink/10 bg-white shadow-card p-1.5 z-30">
              {[
                { email: 'inzenjer@gradex.rs', label: 'Inženjer — Nemanja Vukić' },
                { email: 'izvodjac@gradex.rs', label: 'Izvođač — Milica Radović' },
                { email: 'admin@gradex.rs', label: 'Administrator' },
              ].map((opt) => (
                <button
                  key={opt.email}
                  onClick={() => {
                    demoLogin(opt.email)
                    setDemoOpen(false)
                    navigate('/app')
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded hover:bg-paper text-ink/80"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-ink/5"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-semibold shrink-0"
              style={{ backgroundColor: user?.avatarBoja || '#10263F' }}
            >
              {inicijali(user)}
            </span>
            <span className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-medium text-ink">{user?.ime} {user?.prezime}</span>
              <span className="text-[11px] text-ink/50">{nazivUloge(user?.uloga)}</span>
            </span>
            <ChevronDown size={15} className="text-ink/40" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-ink/10 bg-white shadow-card p-1.5 z-30">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/app/profil')
                }}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-paper text-ink/80"
              >
                Moj profil
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm rounded hover:bg-stamp-red/10 text-stamp-red"
              >
                <LogOut size={14} /> Odjava
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const linkovi = [
  { to: '/', label: 'Početna' },
  { to: '/kako-funkcionise', label: 'Kako funkcioniše' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {linkovi.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-safety' : 'text-ink/70 hover:text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                to="/app"
                className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light transition-colors"
              >
                Otvori aplikaciju
              </Link>
            ) : (
              <>
                <Link to="/prijava" className="text-sm font-medium text-ink/70 hover:text-ink">
                  Prijava
                </Link>
                <Link
                  to="/registracija"
                  className="rounded-md bg-safety px-4 py-2 text-sm font-medium text-white hover:bg-safety-dark transition-colors"
                >
                  Registruj se
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label="Meni"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper px-5 pb-5 pt-2">
          <nav className="flex flex-col gap-1">
            {linkovi.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-safety/10 text-safety' : 'text-ink/70'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-ink/10">
              {user ? (
                <Link
                  to="/app"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper"
                >
                  Otvori aplikaciju
                </Link>
              ) : (
                <>
                  <Link
                    to="/prijava"
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-ink/15 px-4 py-2.5 text-center text-sm font-medium text-ink"
                  >
                    Prijava
                  </Link>
                  <Link
                    to="/registracija"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-safety px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Registruj se
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

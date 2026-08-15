import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findUserByEmail, users } from '../data/users'

const AuthContext = createContext(null)
const STORAGE_KEY = 'gradex_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  // TODO(backend): zameniti sa POST /api/auth/login → { token, user }
  function login(email, lozinka) {
    const found = findUserByEmail(email)
    if (!found) return { ok: false, poruka: 'Nalog sa ovom email adresom ne postoji.' }
    if (found.lozinka !== lozinka) return { ok: false, poruka: 'Pogrešna lozinka.' }
    const { lozinka: _pw, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return { ok: true }
  }

  // TODO(backend): zameniti sa POST /api/auth/register
  function register(podaci) {
    const postoji = findUserByEmail(podaci.email)
    if (postoji) return { ok: false, poruka: 'Nalog sa ovom email adresom već postoji.' }
    const noviKorisnik = {
      id: 'u' + (users.length + Math.floor(Math.random() * 1000) + 10),
      ...podaci,
      avatarBoja: podaci.uloga === 'inzenjer' ? '#2C6E4F' : '#E2571F',
    }
    users.push(noviKorisnik)
    const { lozinka: _pw, ...safeUser } = noviKorisnik
    setUser(safeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return { ok: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Demo prečica: brzo prebacivanje uloge radi prikaza različitih pogleda (uklonjeno kad se poveže pravi backend)
  function demoLogin(email) {
    const found = findUserByEmail(email)
    if (!found) return
    const { lozinka: _pw, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, demoLogin }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth mora biti korišćen unutar AuthProvider')
  return ctx
}

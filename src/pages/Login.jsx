import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import StampSeal from '../components/StampSeal'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [lozinka, setLozinka] = useState('')
  const [pokaziLozinku, setPokaziLozinku] = useState(false)
  const [greska, setGreska] = useState('')
  const [ucitava, setUcitava] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setGreska('')
    if (!email || !lozinka) {
      setGreska('Unesite email i lozinku.')
      return
    }
    setUcitava(true)
    // TODO(backend): zameniti realnim API pozivom sa JWT tokenom
    setTimeout(() => {
      const rez = login(email, lozinka)
      setUcitava(false)
      if (!rez.ok) {
        setGreska(rez.poruka)
        return
      }
      navigate('/app')
    }, 300)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Blueprint panel */}
      <div className="hidden lg:flex relative bg-ink text-paper flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-blueprint bg-grid-lg opacity-70" aria-hidden="true" />
        <Link to="/" className="relative z-10">
          <Logo variant="light" size="lg" />
        </Link>
        <div className="relative z-10 max-w-sm">
          <blockquote className="font-display text-2xl font-medium leading-snug">
            "Dnevnik koji se ne gubi, ne kasni i ne čeka potpis na papiru."
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <StampSeal ime="N. Vukić" datum="11.08.2026." size={56} />
            <p className="text-sm text-paper/60">
              Odgovorni inženjer overava unos digitalnim pečatom u trenutku pregleda.
            </p>
          </div>
        </div>
        <p className="relative z-10 text-xs font-mono text-paper/40">GRADEX — DIGITALNI GRAĐEVINSKI DNEVNIK</p>
      </div>

      {/* Forma */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden inline-block mb-8">
            <Logo />
          </Link>
          <h1 className="font-display text-2xl font-semibold text-ink">Prijava</h1>
          <p className="mt-1.5 text-sm text-ink/55">Unesite podatke da nastavite rad na dnevniku.</p>

          {greska && (
            <div className="mt-5 rounded-md bg-stamp-red/10 text-stamp-red text-sm px-4 py-3">{greska}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                placeholder="ime@firma.rs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Lozinka</label>
              <div className="relative">
                <input
                  type={pokaziLozinku ? 'text' : 'password'}
                  value={lozinka}
                  onChange={(e) => setLozinka(e.target.value)}
                  className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 pr-10 text-sm focus:border-safety outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setPokaziLozinku((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70"
                  tabIndex={-1}
                  aria-label="Prikaži lozinku"
                >
                  {pokaziLozinku ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={ucitava}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-safety px-5 py-2.5 text-sm font-medium text-white hover:bg-safety-dark transition-colors disabled:opacity-60"
            >
              {ucitava ? 'Prijavljivanje…' : (<><LogIn size={16} /> Prijavi se</>)}
            </button>
          </form>

          <div className="mt-6 rounded-md border border-ink/10 bg-paper-dark px-4 py-3">
            <p className="text-[11px] font-mono text-ink/50 mb-1.5">DEMO NALOZI</p>
            <ul className="text-xs text-ink/60 space-y-0.5 font-mono">
              <li>inzenjer@gradex.rs / gradex123</li>
              <li>izvodjac@gradex.rs / gradex123</li>
              <li>admin@gradex.rs / admin123</li>
            </ul>
          </div>

          <p className="mt-6 text-sm text-ink/55">
            Nemate nalog?{' '}
            <Link to="/registracija" className="text-safety font-medium hover:underline">
              Registrujte se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, X, UserPlus, HardHat, ClipboardCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

const PRAVILA_LOZINKE = [
  { test: (v) => v.length >= 8, opis: 'Najmanje 8 karaktera' },
  { test: (v) => /[A-Z]/.test(v), opis: 'Bar jedno veliko slovo' },
  { test: (v) => /[0-9]/.test(v), opis: 'Bar jedan broj' },
  { test: (v) => /[^A-Za-z0-9]/.test(v), opis: 'Bar jedan specijalni karakter' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [uloga, setUloga] = useState('inzenjer')
  const [podaci, setPodaci] = useState({
    ime: '',
    prezime: '',
    email: '',
    lozinka: '',
    potvrdaLozinke: '',
    firma: '',
    licenca: '',
    telefon: '',
  })
  const [greska, setGreska] = useState('')
  const [ucitava, setUcitava] = useState(false)

  function upd(polje, vrednost) {
    setPodaci((p) => ({ ...p, [polje]: vrednost }))
  }

  const lozinkaValidna = PRAVILA_LOZINKE.every((p) => p.test(podaci.lozinka))
  const lozinkeSeSlazu = podaci.lozinka.length > 0 && podaci.lozinka === podaci.potvrdaLozinke

  function handleSubmit(e) {
    e.preventDefault()
    setGreska('')

    if (!podaci.ime || !podaci.prezime || !podaci.email || !podaci.firma) {
      setGreska('Popunite sva obavezna polja.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(podaci.email)) {
      setGreska('Unesite ispravnu email adresu.')
      return
    }
    if (!lozinkaValidna) {
      setGreska('Lozinka ne ispunjava sve uslove kompleksnosti.')
      return
    }
    if (!lozinkeSeSlazu) {
      setGreska('Lozinke se ne poklapaju.')
      return
    }
    if (uloga === 'inzenjer' && !podaci.licenca) {
      setGreska('Broj licence je obavezan za odgovornog inženjera.')
      return
    }

    setUcitava(true)
    // TODO(backend): zameniti realnim API pozivom (hashovanje lozinke na serveru!)
    setTimeout(() => {
      const rez = register({
        ime: podaci.ime,
        prezime: podaci.prezime,
        email: podaci.email,
        lozinka: podaci.lozinka,
        firma: podaci.firma,
        telefon: podaci.telefon,
        licenca: uloga === 'inzenjer' ? podaci.licenca : undefined,
        uloga,
      })
      setUcitava(false)
      if (!rez.ok) {
        setGreska(rez.poruka)
        return
      }
      navigate('/app')
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper bg-grid-paper bg-grid px-6 py-14">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-block mb-8">
          <Logo />
        </Link>

        <div className="rounded-xl border border-ink/10 bg-white p-7 sm:p-9 shadow-card">
          <h1 className="font-display text-2xl font-semibold text-ink">Napravite nalog</h1>
          <p className="mt-1.5 text-sm text-ink/55">Izaberite ulogu koja odgovara vašem poslu na gradilištu.</p>

          {/* Izbor uloge */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUloga('inzenjer')}
              className={`flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-colors ${
                uloga === 'inzenjer' ? 'border-stamp-green bg-stamp-green/5' : 'border-ink/10 hover:border-ink/20'
              }`}
            >
              <ClipboardCheck size={19} className={uloga === 'inzenjer' ? 'text-stamp-green' : 'text-ink/50'} />
              <span className="text-sm font-medium text-ink">Odgovorni inženjer</span>
              <span className="text-xs text-ink/50 leading-snug">Pregleda i overava dnevnik</span>
            </button>
            <button
              type="button"
              onClick={() => setUloga('izvodjac')}
              className={`flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-colors ${
                uloga === 'izvodjac' ? 'border-safety bg-safety/5' : 'border-ink/10 hover:border-ink/20'
              }`}
            >
              <HardHat size={19} className={uloga === 'izvodjac' ? 'text-safety' : 'text-ink/50'} />
              <span className="text-sm font-medium text-ink">Izvođač / investitor</span>
              <span className="text-xs text-ink/50 leading-snug">Unosi dnevne izveštaje</span>
            </button>
          </div>

          {greska && (
            <div className="mt-5 rounded-md bg-stamp-red/10 text-stamp-red text-sm px-4 py-3">{greska}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink/70 mb-1.5">Ime</label>
                <input
                  value={podaci.ime}
                  onChange={(e) => upd('ime', e.target.value)}
                  className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink/70 mb-1.5">Prezime</label>
                <input
                  value={podaci.prezime}
                  onChange={(e) => upd('prezime', e.target.value)}
                  className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Email</label>
              <input
                type="email"
                value={podaci.email}
                onChange={(e) => upd('email', e.target.value)}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                placeholder="ime@firma.rs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink/70 mb-1.5">Firma</label>
                <input
                  value={podaci.firma}
                  onChange={(e) => upd('firma', e.target.value)}
                  className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                />
              </div>
              {uloga === 'inzenjer' ? (
                <div>
                  <label className="block text-xs font-medium text-ink/70 mb-1.5">Broj licence</label>
                  <input
                    value={podaci.licenca}
                    onChange={(e) => upd('licenca', e.target.value)}
                    className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                    placeholder="401 0000 00"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-ink/70 mb-1.5">Telefon</label>
                  <input
                    value={podaci.telefon}
                    onChange={(e) => upd('telefon', e.target.value)}
                    className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Lozinka</label>
              <input
                type="password"
                value={podaci.lozinka}
                onChange={(e) => upd('lozinka', e.target.value)}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
              {podaci.lozinka.length > 0 && (
                <ul className="mt-2 grid grid-cols-2 gap-1.5">
                  {PRAVILA_LOZINKE.map((p) => {
                    const ok = p.test(podaci.lozinka)
                    return (
                      <li key={p.opis} className={`flex items-center gap-1.5 text-[11px] ${ok ? 'text-stamp-green' : 'text-ink/40'}`}>
                        {ok ? <Check size={12} /> : <X size={12} />} {p.opis}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Potvrdite lozinku</label>
              <input
                type="password"
                value={podaci.potvrdaLozinke}
                onChange={(e) => upd('potvrdaLozinke', e.target.value)}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
              {podaci.potvrdaLozinke.length > 0 && !lozinkeSeSlazu && (
                <p className="mt-1.5 text-[11px] text-stamp-red">Lozinke se ne poklapaju.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={ucitava}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-safety px-5 py-2.5 text-sm font-medium text-white hover:bg-safety-dark transition-colors disabled:opacity-60"
            >
              {ucitava ? 'Kreiranje naloga…' : (<><UserPlus size={16} /> Napravi nalog</>)}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink/55">
            Već imate nalog?{' '}
            <Link to="/prijava" className="text-safety font-medium hover:underline">
              Prijavite se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


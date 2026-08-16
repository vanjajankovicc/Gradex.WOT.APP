import { useState } from 'react'
import { Save, Check } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { inicijali, nazivUloge } from '../../data/uloge'

export default function Profil() {
  const { user } = useAuth()
  const [forma, setForma] = useState({
    ime: user.ime,
    prezime: user.prezime,
    email: user.email,
    telefon: user.telefon || '',
    firma: user.firma || '',
    licenca: user.licenca || '',
  })
  const [sacuvano, setSacuvano] = useState(false)

  function submit(e) {
    e.preventDefault()
    // TODO(backend): PUT /api/users/:id
    setSacuvano(true)
    setTimeout(() => setSacuvano(false), 2500)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-xl font-semibold text-ink">Moj profil</h2>
      <p className="text-sm text-ink/50 mt-1">Ažurirajte svoje lične i poslovne podatke.</p>

      <div className="mt-6 flex items-center gap-4">
        <span
          className="flex items-center justify-center w-16 h-16 rounded-full text-white text-xl font-semibold"
          style={{ backgroundColor: user.avatarBoja }}
        >
          {inicijali(user)}
        </span>
        <div>
          <p className="font-medium text-ink">{user.ime} {user.prezime}</p>
          <p className="text-sm text-ink/50">{nazivUloge(user.uloga)}</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 rounded-lg border border-ink/10 bg-white p-6 space-y-4">
        {sacuvano && (
          <div className="flex items-center gap-2 rounded-md bg-stamp-green/10 text-stamp-green text-sm px-4 py-3">
            <Check size={15} /> Podaci su sačuvani.
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Ime</label>
            <input
              value={forma.ime}
              onChange={(e) => setForma((f) => ({ ...f, ime: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Prezime</label>
            <input
              value={forma.prezime}
              onChange={(e) => setForma((f) => ({ ...f, prezime: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-ink/70 mb-1.5">Email</label>
          <input
            type="email"
            value={forma.email}
            onChange={(e) => setForma((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Telefon</label>
            <input
              value={forma.telefon}
              onChange={(e) => setForma((f) => ({ ...f, telefon: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Firma</label>
            <input
              value={forma.firma}
              onChange={(e) => setForma((f) => ({ ...f, firma: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
        </div>
        {user.uloga === 'inzenjer' && (
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Broj licence</label>
            <input
              value={forma.licenca}
              onChange={(e) => setForma((f) => ({ ...f, licenca: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
        )}
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-light transition-colors"
        >
          <Save size={15} /> Sačuvaj izmene
        </button>
      </form>
    </div>
  )
}

import { useState } from 'react'
import { Trash2, ShieldCheck, HardHat, ClipboardCheck } from 'lucide-react'
import { users as pocetniKorisnici } from '../../data/users'
import { gradilista } from '../../data/gradilista'
import { nazivUloge, formatDatum } from '../../data/uloge'
import StatusBadge from '../../components/StatusBadge'
import StatCard from '../../components/StatCard'

const IKONE_ULOGA = { inzenjer: ClipboardCheck, izvodjac: HardHat, admin: ShieldCheck }

export default function Admin() {
  const [tab, setTab] = useState('korisnici')
  const [korisnici, setKorisnici] = useState(pocetniKorisnici)

  function obrisiKorisnika(id) {
    if (!confirm('Obrisati ovog korisnika iz sistema?')) return
    setKorisnici((prev) => prev.filter((u) => u.id !== id))
  }

  const brojInzenjera = korisnici.filter((u) => u.uloga === 'inzenjer').length
  const brojIzvodjaca = korisnici.filter((u) => u.uloga === 'izvodjac').length

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Administracija</h2>
      <p className="text-sm text-ink/50 mt-1">Upravljanje korisnicima i gradilištima u sistemu.</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Korisnika" value={korisnici.length} />
        <StatCard label="Inženjera" value={brojInzenjera} accent="text-stamp-green" />
        <StatCard label="Izvođača" value={brojIzvodjaca} accent="text-safety" />
        <StatCard label="Gradilišta" value={gradilista.length} />
      </div>

      <div className="mt-8 border-b border-ink/10 flex gap-6">
        {[
          { id: 'korisnici', label: 'Korisnici' },
          { id: 'gradilista', label: 'Gradilišta' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id ? 'border-safety text-ink' : 'border-transparent text-ink/45 hover:text-ink/70'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'korisnici' && (
        <div className="mt-6 rounded-lg border border-ink/10 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-paper-dark text-left">
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium">KORISNIK</th>
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium">ULOGA</th>
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium hidden sm:table-cell">FIRMA</th>
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium hidden md:table-cell">EMAIL</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {korisnici.map((u) => {
                const Ikona = IKONE_ULOGA[u.uloga]
                return (
                  <tr key={u.id} className="border-b border-ink/5 last:border-0 hover:bg-paper/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-semibold shrink-0"
                          style={{ backgroundColor: u.avatarBoja }}
                        >
                          {u.ime[0]}{u.prezime[0]}
                        </span>
                        <span className="font-medium text-ink">{u.ime} {u.prezime}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                        <Ikona size={13} /> {nazivUloge(u.uloga)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-ink/60 hidden sm:table-cell">{u.firma}</td>
                    <td className="px-5 py-3.5 text-ink/60 hidden md:table-cell font-mono text-xs">{u.email}</td>
                    <td className="px-5 py-3.5 text-right">
                      {u.uloga !== 'admin' && (
                        <button
                          onClick={() => obrisiKorisnika(u.id)}
                          className="text-ink/30 hover:text-stamp-red transition-colors"
                          aria-label="Obriši korisnika"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'gradilista' && (
        <div className="mt-6 rounded-lg border border-ink/10 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-paper-dark text-left">
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium">NAZIV</th>
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium hidden sm:table-cell">ROK</th>
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium">NAPREDAK</th>
                <th className="px-5 py-3 font-mono text-[11px] text-ink/45 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {gradilista.map((g) => (
                <tr key={g.id} className="border-b border-ink/5 last:border-0 hover:bg-paper/40">
                  <td className="px-5 py-3.5 font-medium text-ink">{g.naziv}</td>
                  <td className="px-5 py-3.5 text-ink/60 hidden sm:table-cell font-mono text-xs">{formatDatum(g.rokZavrsetka)}</td>
                  <td className="px-5 py-3.5 text-ink/60">{g.napredak}%</td>
                  <td className="px-5 py-3.5"><StatusBadge status={g.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

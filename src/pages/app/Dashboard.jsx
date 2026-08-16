import { Link } from 'react-router-dom'
import { HardHat, FileStack, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { gradilista } from '../../data/gradilista'
import { dnevnikUnosi } from '../../data/dnevnik'
import { users } from '../../data/users'
import StatCard from '../../components/StatCard'
import StatusBadge from '../../components/StatusBadge'
import { formatDatum } from '../../data/uloge'


export default function Dashboard() {
 const { user } = useAuth()
const mojaGradilista =
    user.uloga === 'admin'
      ? gradilista
      : user.uloga === 'inzenjer'
      ? gradilista.filter((g) => g.odgovorniInzenjerId === user.id)
      : gradilista.filter((g) => g.izvodjacId === user.id)

  const idsMojihGradilista = mojaGradilista.map((g) => g.id)
  const mojiUnosi =
    user.uloga === 'admin'
      ? dnevnikUnosi
      : dnevnikUnosi.filter((d) => idsMojihGradilista.includes(d.gradilisteId))

  const naCekanju = mojiUnosi.filter((d) => d.status === 'poslato').length
  const overeno = mojiUnosi.filter((d) => d.status === 'overeno').length
  const odbijeno = mojiUnosi.filter((d) => d.status === 'odbijeno').length

  const noviji = [...mojiUnosi].sort((a, b) => new Date(b.datum) - new Date(a.datum)).slice(0, 6)

  function nazivGradilista(id) {
    return gradilista.find((g) => g.id === id)?.naziv || '—'
  }
  function autorImePrezime(id) {
    const u = users.find((x) => x.id === id)
    return u ? `${u.ime} ${u.prezime}` : '—'
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-ink/55">
          Dobrodošli, <span className="font-medium text-ink">{user.ime}</span>. Evo pregleda
          {user.uloga === 'inzenjer' ? ' gradilišta koja nadzirete.' : user.uloga === 'admin' ? ' celog sistema.' : ' vaših gradilišta.'}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HardHat} label="Gradilišta" value={mojaGradilista.length} />
        <StatCard icon={Clock} label="Na čekanju" value={naCekanju} accent="text-blueprint" />
        <StatCard icon={CheckCircle2} label="Overeno" value={overeno} accent="text-stamp-green" />
        <StatCard icon={XCircle} label="Odbijeno" value={odbijeno} accent="text-stamp-red" />
      </div>

      <div className="grid lg:grid-cols-[1.3fr,1fr] gap-6">
        {/* Gradilišta */}
        <div className="rounded-lg border border-ink/10 bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
            <h2 className="font-display font-semibold text-ink text-sm">
              {user.uloga === 'admin' ? 'Sva gradilišta' : 'Moja gradilišta'}
            </h2>
            <Link to="/app/gradilista" className="text-xs font-medium text-safety flex items-center gap-1 hover:underline">
              Sva gradilišta <ArrowRight size={13} />
            </Link>
          </div>
          <ul className="divide-y divide-ink/5">
            {mojaGradilista.slice(0, 4).map((g) => (
              <li key={g.id}>
                <Link to={`/app/gradilista/${g.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper/60 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{g.naziv}</p>
                    <p className="text-xs text-ink/50 mt-0.5 truncate">{g.lokacija}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block w-24">
                      <div className="h-1.5 rounded-full bg-ink/10 overflow-hidden">
                        <div className="h-full bg-safety rounded-full" style={{ width: `${g.napredak}%` }} />
                      </div>
                      <p className="text-[10px] font-mono text-ink/40 mt-1">{g.napredak}%</p>
                    </div>
                    <StatusBadge status={g.status} />
                  </div>
                </Link>
              </li>
            ))}
            {mojaGradilista.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-ink/45">Nema dodeljenih gradilišta.</li>
            )}
          </ul>
        </div>

        {/* Poslednji unosi */}
        <div className="rounded-lg border border-ink/10 bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
            <h2 className="font-display font-semibold text-ink text-sm flex items-center gap-2">
              <FileStack size={15} className="text-ink/40" /> Poslednji unosi
            </h2>
          </div>
          <ul className="divide-y divide-ink/5">
            {noviji.map((d) => (
              <li key={d.id} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-ink/40">#{d.redniBroj} · {formatDatum(d.datum)}</p>
                    <p className="text-sm text-ink mt-0.5 truncate">{nazivGradilista(d.gradilisteId)}</p>
                    <p className="text-[11px] text-ink/45 mt-0.5">{autorImePrezime(d.autorId)}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              </li>
            ))}
            {noviji.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-ink/45">Nema unosa u dnevniku.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

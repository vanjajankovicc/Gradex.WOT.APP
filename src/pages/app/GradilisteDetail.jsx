import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Wallet, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getGradilisteById } from '../../data/gradilista'
import { dnevnikUnosi as pocetniUnosi } from '../../data/dnevnik'
import { users } from '../../data/users'
import StatusBadge from '../../components/StatusBadge'
import { formatDatum, formatNovac } from '../../data/uloge'
import DnevnikTab from './DnevnikTab'

export default function GradilisteDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [tab, setTab] = useState('pregled')
  const [unosi, setUnosi] = useState(pocetniUnosi)

  const gradiliste = getGradilisteById(id)

  const imaPristup =
    user.uloga === 'admin' ||
    gradiliste?.odgovorniInzenjerId === user.id ||
    gradiliste?.izvodjacId === user.id

  if (!gradiliste) return <Navigate to="/app/gradilista" replace />
  if (!imaPristup) return <Navigate to="/app/gradilista" replace />

  const izvodjac = users.find((u) => u.id === gradiliste.izvodjacId)
  const inzenjer = users.find((u) => u.id === gradiliste.odgovorniInzenjerId)
  const unosiGradilista = unosi
    .filter((d) => d.gradilisteId === gradiliste.id)
    .sort((a, b) => b.redniBroj - a.redniBroj)

  const tabovi = [
    { id: 'pregled', label: 'Pregled' },
    { id: 'dnevnik', label: `Dnevnik (${unosiGradilista.length})` },
    { id: 'tim', label: 'Tim' },
  ]

  return (
    <div>
      <Link to="/app/gradilista" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink">
        <ArrowLeft size={14} /> Sva gradilišta
      </Link>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink">{gradiliste.naziv}</h1>
            <StatusBadge status={gradiliste.status} />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink/50">
            <MapPin size={13} /> {gradiliste.lokacija}
          </p>
        </div>
        <div className="sm:text-right shrink-0">
          <p className="text-[11px] font-mono text-ink/40">NAPREDAK</p>
          <p className="font-display text-2xl font-semibold text-ink">{gradiliste.napredak}%</p>
        </div>
      </div>

      <div className="mt-3 h-2 rounded-full bg-ink/10 overflow-hidden max-w-md">
        <div className="h-full bg-safety rounded-full transition-all" style={{ width: `${gradiliste.napredak}%` }} />
      </div>

      <div className="mt-6 border-b border-ink/10 flex gap-6">
        {tabovi.map((t) => (
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

      <div className="mt-6">
        {tab === 'pregled' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-lg border border-ink/10 bg-white p-6">
              <h3 className="font-display font-semibold text-ink text-sm mb-3">Opis</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{gradiliste.opis}</p>
              <dl className="mt-6 grid grid-cols-2 gap-5">
                <div>
                  <dt className="flex items-center gap-1.5 text-[11px] font-mono text-ink/40"><FileText size={12}/> VRSTA OBJEKTA</dt>
                  <dd className="text-sm text-ink mt-1">{gradiliste.vrstaObjekta || '—'}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-[11px] font-mono text-ink/40"><FileText size={12}/> BROJ DOZVOLE</dt>
                  <dd className="text-sm text-ink mt-1">{gradiliste.brojDozvole || '—'}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-[11px] font-mono text-ink/40"><Calendar size={12}/> POČETAK RADOVA</dt>
                  <dd className="text-sm text-ink mt-1">{formatDatum(gradiliste.datumPocetka)}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-[11px] font-mono text-ink/40"><Calendar size={12}/> ROK ZAVRŠETKA</dt>
                  <dd className="text-sm text-ink mt-1">{formatDatum(gradiliste.rokZavrsetka)}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-lg border border-ink/10 bg-white p-6 space-y-5">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-mono text-ink/40"><Wallet size={12}/> BUDŽET</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">{formatNovac(gradiliste.budzet)}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-ink/40">INVESTITOR</p>
                <p className="mt-1 text-sm text-ink">{gradiliste.investitor}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'dnevnik' && (
          <DnevnikTab
            gradiliste={gradiliste}
            unosi={unosiGradilista}
            setUnosi={setUnosi}
            svi={unosi}
          />
        )}

        {tab === 'tim' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-ink/10 bg-white p-5">
              <p className="text-[11px] font-mono text-ink/40 mb-2">ODGOVORNI INŽENJER</p>
              <p className="font-medium text-ink">{inzenjer?.ime} {inzenjer?.prezime}</p>
              <p className="text-sm text-ink/50 mt-0.5">{inzenjer?.firma}</p>
              <p className="text-sm text-ink/50">Licenca: {inzenjer?.licenca}</p>
              <p className="text-sm text-ink/50">{inzenjer?.email}</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-white p-5">
              <p className="text-[11px] font-mono text-ink/40 mb-2">IZVOĐAČ RADOVA</p>
              <p className="font-medium text-ink">{izvodjac?.ime} {izvodjac?.prezime}</p>
              <p className="text-sm text-ink/50 mt-0.5">{izvodjac?.firma}</p>
              <p className="text-sm text-ink/50">{izvodjac?.telefon}</p>
              <p className="text-sm text-ink/50">{izvodjac?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

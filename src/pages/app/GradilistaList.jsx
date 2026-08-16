import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, MapPin, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { gradilista as pocetnaGradilista } from '../../data/gradilista'
import { users } from '../../data/users'
import StatusBadge from '../../components/StatusBadge'
import { formatDatum } from '../../data/uloge'

export default function GradilistaList() {
  const { user } = useAuth()
  const [lista, setLista] = useState(pocetnaGradilista)
  const [pretraga, setPretraga] = useState('')
  const [filterStatus, setFilterStatus] = useState('sve')
  const [modalOtvoren, setModalOtvoren] = useState(false)

  const mozeKreirati = user.uloga === 'inzenjer' || user.uloga === 'admin'

  const vidljiva =
    user.uloga === 'admin'
      ? lista
      : user.uloga === 'inzenjer'
      ? lista.filter((g) => g.odgovorniInzenjerId === user.id)
      : lista.filter((g) => g.izvodjacId === user.id)

  const filtrirana = useMemo(() => {
    return vidljiva.filter((g) => {
      const odgovaraStatusu = filterStatus === 'sve' || g.status === filterStatus
      const odgovaraPretrazi =
        g.naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
        g.lokacija.toLowerCase().includes(pretraga.toLowerCase())
      return odgovaraStatusu && odgovaraPretrazi
    })
  }, [vidljiva, pretraga, filterStatus])

  function handleCreate(novo) {
    setLista((l) => [{ ...novo, id: 'g' + (l.length + 1 + Math.floor(Math.random() * 1000)) }, ...l])
    setModalOtvoren(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Gradilišta</h2>
          <p className="text-sm text-ink/50 mt-0.5">{filtrirana.length} od {vidljiva.length} gradilišta</p>
        </div>
        {mozeKreirati && (
          <button
            onClick={() => setModalOtvoren(true)}
            className="inline-flex items-center gap-2 rounded-md bg-safety px-4 py-2.5 text-sm font-medium text-white hover:bg-safety-dark transition-colors shrink-0"
          >
            <Plus size={16} /> Novo gradilište
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
          <input
            value={pretraga}
            onChange={(e) => setPretraga(e.target.value)}
            placeholder="Pretraži po nazivu ili lokaciji…"
            className="w-full rounded-md border border-ink/15 bg-white pl-10 pr-3.5 py-2.5 text-sm focus:border-safety outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:border-safety outline-none font-mono"
        >
          <option value="sve">Svi statusi</option>
          <option value="u toku">U toku</option>
          <option value="završeno">Završeno</option>
          <option value="obustavljeno">Obustavljeno</option>
        </select>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {filtrirana.map((g) => {
          const izvodjac = users.find((u) => u.id === g.izvodjacId)
          const inzenjer = users.find((u) => u.id === g.odgovorniInzenjerId)
          return (
            <Link
              key={g.id}
              to={`/app/gradilista/${g.id}`}
              className="rounded-lg border border-ink/10 bg-white p-5 hover:border-safety/40 hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-semibold text-ink leading-snug">{g.naziv}</h3>
                <StatusBadge status={g.status} />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ink/50">
                <MapPin size={12} /> {g.lokacija}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-ink/40 mb-1">
                  <span>Napredak</span>
                  <span>{g.napredak}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-ink/10 overflow-hidden">
                  <div className="h-full bg-safety rounded-full" style={{ width: `${g.napredak}%` }} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-ink/5 flex items-center justify-between text-xs text-ink/50">
                <span>{inzenjer?.ime} {inzenjer?.prezime} · inž.</span>
                <span>{izvodjac?.firma}</span>
              </div>
              <p className="mt-2 text-[11px] font-mono text-ink/35">
                Rok: {formatDatum(g.rokZavrsetka)}
              </p>
            </Link>
          )
        })}
        {filtrirana.length === 0 && (
          <div className="sm:col-span-2 rounded-lg border border-dashed border-ink/15 py-16 text-center">
            <p className="text-sm text-ink/50">Nema gradilišta koja odgovaraju pretrazi.</p>
          </div>
        )}
      </div>

      {modalOtvoren && (
        <NovoGradilisteModal onClose={() => setModalOtvoren(false)} onCreate={handleCreate} user={user} />
      )}
    </div>
  )
}

function NovoGradilisteModal({ onClose, onCreate, user }) {
  const [forma, setForma] = useState({
    naziv: '',
    lokacija: '',
    vrstaObjekta: '',
    investitor: '',
    izvodjacId: '',
    rokZavrsetka: '',
    budzet: '',
    opis: '',
  })

  const izvodjaci = users.filter((u) => u.uloga === 'izvodjac')

  function submit(e) {
    e.preventDefault()
    if (!forma.naziv || !forma.lokacija || !forma.izvodjacId) return
    onCreate({
      ...forma,
      budzet: Number(forma.budzet) || 0,
      odgovorniInzenjerId: user.uloga === 'inzenjer' ? user.id : '',
      datumPocetka: new Date().toISOString().slice(0, 10),
      status: 'u toku',
      napredak: 0,
      brojDozvole: '—',
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 sticky top-0 bg-white">
          <h3 className="font-display font-semibold text-ink">Novo gradilište</h3>
          <button onClick={onClose} className="text-ink/40 hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Naziv gradilišta *</label>
            <input
              required
              value={forma.naziv}
              onChange={(e) => setForma((f) => ({ ...f, naziv: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Lokacija *</label>
            <input
              required
              value={forma.lokacija}
              onChange={(e) => setForma((f) => ({ ...f, lokacija: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Vrsta objekta</label>
              <input
                value={forma.vrstaObjekta}
                onChange={(e) => setForma((f) => ({ ...f, vrstaObjekta: e.target.value }))}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Investitor</label>
              <input
                value={forma.investitor}
                onChange={(e) => setForma((f) => ({ ...f, investitor: e.target.value }))}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Izvođač radova *</label>
            <select
              required
              value={forma.izvodjacId}
              onChange={(e) => setForma((f) => ({ ...f, izvodjacId: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
            >
              <option value="">Izaberite izvođača…</option>
              {izvodjaci.map((u) => (
                <option key={u.id} value={u.id}>{u.firma} — {u.ime} {u.prezime}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Rok završetka</label>
              <input
                type="date"
                value={forma.rokZavrsetka}
                onChange={(e) => setForma((f) => ({ ...f, rokZavrsetka: e.target.value }))}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Budžet (RSD)</label>
              <input
                type="number"
                value={forma.budzet}
                onChange={(e) => setForma((f) => ({ ...f, budzet: e.target.value }))}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Opis</label>
            <textarea
              rows={3}
              value={forma.opis}
              onChange={(e) => setForma((f) => ({ ...f, opis: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink/70 hover:bg-paper"
            >
              Otkaži
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-safety px-4 py-2.5 text-sm font-medium text-white hover:bg-safety-dark"
            >
              Sačuvaj gradilište
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

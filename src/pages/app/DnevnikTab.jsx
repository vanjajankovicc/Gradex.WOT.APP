import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X as XIcon, ChevronDown, Users as UsersIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { users } from '../../data/users'
import StatusBadge from '../../components/StatusBadge'
import StampSeal from '../../components/StampSeal'
import { formatDatum } from '../../data/uloge'

const PRAZNA_FORMA = {
  vremenskiUslovi: '',
  brojRadnika: '',
  izvedeniRadovi: '',
  utrosenMaterijal: '',
  napomene: '',
}

export default function DnevnikTab({ gradiliste, unosi, setUnosi, svi }) {
  const { user } = useAuth()
  const [modal, setModal] = useState(null) // { mode: 'novi' | 'izmena', unos? }
  const [prosireno, setProsireno] = useState(null)

  const jeIzvodjacOvdje = user.uloga === 'izvodjac' && gradiliste.izvodjacId === user.id
  const jeInzenjerOvdje = user.uloga === 'inzenjer' && gradiliste.odgovorniInzenjerId === user.id
  const mozeDodati = jeIzvodjacOvdje || user.uloga === 'admin'

  function autor(id) {
    const u = users.find((x) => x.id === id)
    return u ? `${u.ime} ${u.prezime}` : '—'
  }

  function sledeciRedniBroj() {
    const brojevi = svi.filter((d) => d.gradilisteId === gradiliste.id).map((d) => d.redniBroj)
    return brojevi.length ? Math.max(...brojevi) + 1 : 1
  }

  function sacuvajNovi(forma) {
    const novi = {
      id: 'd' + Date.now(),
      gradilisteId: gradiliste.id,
      redniBroj: sledeciRedniBroj(),
      datum: new Date().toISOString().slice(0, 10),
      ...forma,
      brojRadnika: Number(forma.brojRadnika) || 0,
      autorId: user.id,
      status: 'poslato',
      overioId: null,
      datumOverenja: null,
    }
    setUnosi((prev) => [novi, ...prev])
    setModal(null)
  }

  function sacuvajIzmenu(id, forma) {
    setUnosi((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...forma, brojRadnika: Number(forma.brojRadnika) || 0 } : d))
    )
    setModal(null)
  }

  function obrisi(id) {
    if (!confirm('Obrisati ovaj unos iz dnevnika?')) return
    setUnosi((prev) => prev.filter((d) => d.id !== id))
  }

  function promeniStatus(id, status) {
    setUnosi((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status,
              overioId: status === 'overeno' || status === 'odbijeno' ? user.id : d.overioId,
              datumOverenja:
                status === 'overeno' || status === 'odbijeno'
                  ? new Date().toISOString().slice(0, 10)
                  : d.datumOverenja,
            }
          : d
      )
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-ink/50">Hronološka evidencija radova na gradilištu.</p>
        {mozeDodati && (
          <button
            onClick={() => setModal({ mode: 'novi' })}
            className="inline-flex items-center gap-2 rounded-md bg-safety px-4 py-2 text-sm font-medium text-white hover:bg-safety-dark transition-colors"
          >
            <Plus size={15} /> Novi unos
          </button>
        )}
      </div>

      <div className="space-y-3">
        {unosi.map((d) => {
          const otvoren = prosireno === d.id
          const mozeUredjivati = (jeIzvodjacOvdje && d.autorId === user.id && d.status !== 'overeno') || user.uloga === 'admin'
          const mozeObrisati = mozeUredjivati
          const mozeOveravati = jeInzenjerOvdje && d.status === 'poslato'

          return (
            <div key={d.id} className="rounded-lg border border-ink/10 bg-white overflow-hidden">
              <button
                onClick={() => setProsireno(otvoren ? null : d.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-paper/50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-mono text-xs text-ink/40 shrink-0">#{d.redniBroj}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{formatDatum(d.datum)} — {d.vremenskiUslovi}</p>
                    <p className="text-xs text-ink/50 truncate mt-0.5 max-w-md">{d.izvedeniRadovi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={d.status} />
                  <ChevronDown size={16} className={`text-ink/30 transition-transform ${otvoren ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {otvoren && (
                <div className="px-5 pb-5 pt-1 border-t border-ink/5">
                  <dl className="grid sm:grid-cols-2 gap-4 mt-3">
                    <div>
                      <dt className="text-[11px] font-mono text-ink/40">BROJ RADNIKA</dt>
                      <dd className="text-sm text-ink mt-0.5">{d.brojRadnika}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-[11px] font-mono text-ink/40"><UsersIcon size={11}/> AUTOR UNOSA</dt>
                      <dd className="text-sm text-ink mt-0.5">{autor(d.autorId)}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-[11px] font-mono text-ink/40">IZVEDENI RADOVI</dt>
                      <dd className="text-sm text-ink/80 mt-0.5 leading-relaxed">{d.izvedeniRadovi}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-[11px] font-mono text-ink/40">UTROŠENI MATERIJAL</dt>
                      <dd className="text-sm text-ink/80 mt-0.5 leading-relaxed">{d.utrosenMaterijal || '—'}</dd>
                    </div>
                    {d.napomene && d.napomene !== '—' && (
                      <div className="sm:col-span-2">
                        <dt className="text-[11px] font-mono text-ink/40">NAPOMENE</dt>
                        <dd className="text-sm text-ink/80 mt-0.5 leading-relaxed">{d.napomene}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-ink/5">
                    <div className="flex items-center gap-2">
                      {mozeUredjivati && (
                        <button
                          onClick={() => setModal({ mode: 'izmena', unos: d })}
                          className="inline-flex items-center gap-1.5 rounded-md border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-paper"
                        >
                          <Pencil size={12} /> Izmeni
                        </button>
                      )}
                      {mozeObrisati && (
                        <button
                          onClick={() => obrisi(d.id)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-stamp-red/25 px-3 py-1.5 text-xs font-medium text-stamp-red hover:bg-stamp-red/5"
                        >
                          <Trash2 size={12} /> Obriši
                        </button>
                      )}
                      {mozeOveravati && (
                        <>
                          <button
                            onClick={() => promeniStatus(d.id, 'overeno')}
                            className="inline-flex items-center gap-1.5 rounded-md bg-stamp-green px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
                          >
                            <Check size={12} /> Overi unos
                          </button>
                          <button
                            onClick={() => promeniStatus(d.id, 'odbijeno')}
                            className="inline-flex items-center gap-1.5 rounded-md border border-stamp-red/25 px-3 py-1.5 text-xs font-medium text-stamp-red hover:bg-stamp-red/5"
                          >
                            <XIcon size={12} /> Vrati na doradu
                          </button>
                        </>
                      )}
                    </div>
                    {d.status === 'overeno' && (
                      <StampSeal ime={autor(d.overioId)} datum={formatDatum(d.datumOverenja)} size={54} />
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {unosi.length === 0 && (
          <div className="rounded-lg border border-dashed border-ink/15 py-16 text-center">
            <p className="text-sm text-ink/50">Dnevnik za ovo gradilište je prazan.</p>
          </div>
        )}
      </div>

      {modal && (
        <DnevnikModal
          mode={modal.mode}
          unos={modal.unos}
          onClose={() => setModal(null)}
          onSaveNew={sacuvajNovi}
          onSaveEdit={sacuvajIzmenu}
        />
      )}
    </div>
  )
}

function DnevnikModal({ mode, unos, onClose, onSaveNew, onSaveEdit }) {
  const [forma, setForma] = useState(
    unos
      ? {
          vremenskiUslovi: unos.vremenskiUslovi,
          brojRadnika: unos.brojRadnika,
          izvedeniRadovi: unos.izvedeniRadovi,
          utrosenMaterijal: unos.utrosenMaterijal,
          napomene: unos.napomene,
        }
      : PRAZNA_FORMA
  )

  function submit(e) {
    e.preventDefault()
    if (!forma.vremenskiUslovi || !forma.izvedeniRadovi) return
    if (mode === 'novi') onSaveNew(forma)
    else onSaveEdit(unos.id, forma)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 sticky top-0 bg-white">
          <h3 className="font-display font-semibold text-ink">
            {mode === 'novi' ? 'Novi unos u dnevnik' : `Izmena unosa #${unos.redniBroj}`}
          </h3>
          <button onClick={onClose} className="text-ink/40 hover:text-ink">
            <XIcon size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Vremenski uslovi *</label>
              <input
                required
                value={forma.vremenskiUslovi}
                onChange={(e) => setForma((f) => ({ ...f, vremenskiUslovi: e.target.value }))}
                placeholder="Sunčano, 24°C"
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink/70 mb-1.5">Broj radnika</label>
              <input
                type="number"
                min="0"
                value={forma.brojRadnika}
                onChange={(e) => setForma((f) => ({ ...f, brojRadnika: e.target.value }))}
                className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Izvedeni radovi *</label>
            <textarea
              required
              rows={3}
              value={forma.izvedeniRadovi}
              onChange={(e) => setForma((f) => ({ ...f, izvedeniRadovi: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Utrošeni materijal</label>
            <textarea
              rows={2}
              value={forma.utrosenMaterijal}
              onChange={(e) => setForma((f) => ({ ...f, utrosenMaterijal: e.target.value }))}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Napomene</label>
            <textarea
              rows={2}
              value={forma.napomene}
              onChange={(e) => setForma((f) => ({ ...f, napomene: e.target.value }))}
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
              Sačuvaj unos
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'

export default function Kontakt() {
  const [poslato, setPoslato] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO(backend): POST /api/kontakt
    setPoslato(true)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="text-xs font-mono uppercase tracking-wider text-safety">Kontakt</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">Javite nam se</h1>
      <p className="mt-4 text-ink/60 max-w-xl leading-relaxed">
        Pitanja u vezi sa projektom, saradnjom ili prijavom problema — slobodno pišite.
      </p>

      <div className="mt-12 grid lg:grid-cols-[0.9fr,1.1fr] gap-12">
        <div className="space-y-6">
          <div className="flex gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-ink/5 text-ink shrink-0">
              <Mail size={17} />
            </span>
            <div>
              <p className="font-medium text-ink text-sm">Email</p>
              <p className="text-sm text-ink/60">podrska@gradex.rs</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-ink/5 text-ink shrink-0">
              <MapPin size={17} />
            </span>
            <div>
              <p className="font-medium text-ink text-sm">Adresa</p>
              <p className="text-sm text-ink/60">Fakultet tehničkih nauka, Novi Sad</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-ink/10 bg-white p-7 space-y-4">
          {poslato && (
            <div className="rounded-md bg-stamp-green/10 text-stamp-green text-sm px-4 py-3">
              Poruka je poslata. Javićemo se u najkraćem roku.
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Ime i prezime</label>
            <input
              required
              type="text"
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              placeholder="Petar Petrović"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Email</label>
            <input
              required
              type="email"
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none"
              placeholder="petar@primer.rs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70 mb-1.5">Poruka</label>
            <textarea
              required
              rows={4}
              className="w-full rounded-md border border-ink/15 px-3.5 py-2.5 text-sm focus:border-safety outline-none resize-none"
              placeholder="Vaša poruka..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-light transition-colors"
          >
            Pošalji <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  )
}

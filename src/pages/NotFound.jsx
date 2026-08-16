import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-ink/5 text-ink/40 mb-5">
        <Compass size={24} />
      </span>
      <p className="font-mono text-xs text-ink/40">GREŠKA 404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Stranica ne postoji</h1>
      <p className="mt-2 text-sm text-ink/55 max-w-sm">
        Ova lokacija nije pronađena u sistemu — proverite adresu ili se vratite na početnu.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-safety px-5 py-2.5 text-sm font-medium text-white hover:bg-safety-dark transition-colors"
      >
        Nazad na početnu
      </Link>
    </div>
  )
}

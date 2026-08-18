const STILOVI = {
  'u toku': 'bg-blueprint/10 text-blueprint border-blueprint/30',
  'završeno': 'bg-stamp-green/10 text-stamp-green border-stamp-green/30',
  'obustavljeno': 'bg-stamp-red/10 text-stamp-red border-stamp-red/30',
  nacrt: 'bg-steel/10 text-steel-dark border-steel/30',
  poslato: 'bg-blueprint/10 text-blueprint border-blueprint/30',
  overeno: 'bg-stamp-green/10 text-stamp-green border-stamp-green/30',
  odbijeno: 'bg-stamp-red/10 text-stamp-red border-stamp-red/30',
}

export default function StatusBadge({ status }) {
  const stil = STILOVI[status] || 'bg-steel/10 text-steel-dark border-steel/30'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium font-mono capitalize ${stil}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

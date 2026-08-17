export default function StatCard({ icon: Icon, label, value, accent = 'text-ink' }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wide text-ink/45">{label}</span>
        {Icon && <Icon size={16} className="text-ink/30" />}
      </div>
      <p className={`mt-2 font-display text-2xl font-semibold ${accent}`}>{value}</p>
    </div>
  )
}

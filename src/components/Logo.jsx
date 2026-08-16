export default function Logo({ variant = 'dark', size = 'md' }) {
  const sizes = {
    sm: 'text-lg gap-1.5',
    md: 'text-xl gap-2',
    lg: 'text-3xl gap-2.5',
  }
  const isLight = variant === 'light'
  return (
    <div className={`flex items-center ${sizes[size]} font-display font-semibold select-none`}>
      <span
        className={`flex items-center justify-center rounded-full border-2 ${
          isLight ? 'border-blueprint-glow text-blueprint-glow' : 'border-safety text-safety'
        }`}
        style={{ width: '1.5em', height: '1.5em', fontSize: '0.7em' }}
      >
        G
      </span>
      <span className={isLight ? 'text-paper' : 'text-ink'}>
        grad<span className={isLight ? 'text-blueprint-glow' : 'text-safety'}>ex</span>
      </span>
    </div>
  )
}

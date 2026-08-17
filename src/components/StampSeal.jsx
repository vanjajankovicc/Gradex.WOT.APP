// Signature element aplikacije: pečat/overa inženjera — vizuelna referenca na
// stvarni žig kojim odgovorni inženjer overava unos u građevinski dnevnik.
export default function StampSeal({ ime, datum, size = 72 }) {
  return (
    <div
      className="stamp-rotate inline-flex flex-col items-center justify-center rounded-full border-2 border-stamp-green text-stamp-green shrink-0"
      style={{ width: size, height: size }}
      title={`Overio: ${ime} — ${datum}`}
    >
      <span className="text-[0.55rem] font-mono font-semibold leading-none tracking-wide">OVERENO</span>
      <span className="text-[0.5rem] font-mono leading-tight mt-1 text-center px-1">{ime}</span>
      <span className="text-[0.45rem] font-mono opacity-80 mt-0.5">{datum}</span>
    </div>
  )
}

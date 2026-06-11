const phrases = [
  'A rack at every plaza',
  'Secure storage in every building',
  'Every ride ends at a rack',
  'Park it. Lock it. Trust it.',
]

export default function Ticker() {
  const run = [...phrases, ...phrases]
  return (
    <div className="relative overflow-hidden border-y border-pine-600/10 bg-pine-600 py-4" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10">
        {run.map((phrase, i) => (
          <span key={i} className="flex items-center gap-10 text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white">
            {phrase}
            <svg viewBox="0 0 64 64" className="h-4 w-4 text-white/75" fill="none" stroke="currentColor" strokeWidth="8">
              <circle cx="32" cy="24" r="13" />
              <line x1="32" y1="37" x2="32" y2="56" strokeLinecap="round" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

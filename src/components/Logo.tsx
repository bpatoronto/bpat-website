import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
  /** Tailwind text color is inherited; mark + wordmark use currentColor */
  compact?: boolean
}

/** Ring-and-post mark, echoing the BPAT letterhead logo. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="7" />
      <line x1="32" y1="38" x2="32" y2="56" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label="Bike Parking Alliance of Toronto — home">
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.22em]">Bike Parking</span>
          <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.3em] opacity-70">
            Alliance of Toronto
          </span>
        </span>
      )}
    </Link>
  )
}

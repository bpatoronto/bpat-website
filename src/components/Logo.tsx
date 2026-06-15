import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
  /** Tailwind text color is inherited; mark + wordmark use currentColor */
  compact?: boolean
}

/** Ring-and-post mark that doubles as a "P" for parking — the BPAT logo. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ring */}
      <circle cx="30" cy="18" r="7.6" />
      {/* post down to the base */}
      <path d="M30 25.4V55" />
      {/* the "P" bowl on the post */}
      <path d="M30 31c11.5 0 11.5 10 0 10" />
      {/* base bar */}
      <path d="M22 55h16" />
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

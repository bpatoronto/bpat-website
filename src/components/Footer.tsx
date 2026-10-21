import { Link } from 'react-router-dom'
import Logo from './Logo'
import { socials } from '../data/socials'

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-pine-950 py-16 text-white">
      {/* horizon glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-72 opacity-40"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, #3f8589 0%, transparent 70%)' }}
      />

      <div className="container-pg relative">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <Logo className="text-white" />

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/#problem" className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white">The Problem</Link>
            <Link to="/#approach" className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white">Our Approach</Link>
            {/* <Link to="/map" ...>Gap Map</Link> temporarily hidden */}
            {/* <Link to="/#join" ...>Get Involved</Link> temporarily hidden */}
            <Link to="/team" className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white">Meet the Team</Link>
          </nav>

          <div className="flex gap-3">
            {socials.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} BPAT (Bike Parking Alliance of Toronto). Every ride ends at a rack.
          </p>
          <p className="text-xs text-white/70">
            Made with care in Toronto · <a href="mailto:bpat.toronto@gmail.com" className="underline decoration-white/30 underline-offset-2 hover:text-white">bpat.toronto@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

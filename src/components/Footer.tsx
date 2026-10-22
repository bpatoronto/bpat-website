import { Link } from 'react-router-dom'
import { LogoMark } from './Logo'
import { socials } from '../data/socials'

export default function Footer() {
  return (
    <footer className="bg-pine-950 py-14 text-white md:py-20">
      <div className="container-pg">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="text-lg font-semibold">BPAT</span>
            </Link>
            <p className="mt-4 max-w-xs leading-relaxed text-white/65">
              Bike Parking Alliance of Toronto. Every ride ends at a rack.
            </p>
          </div>
          <nav className="flex flex-col gap-2.5 text-white/80">
            <Link to="/#problem" className="hover:text-white">The problem</Link>
            <Link to="/#approach" className="hover:text-white">How it works</Link>
            <Link to="/team" className="hover:text-white">Team</Link>
            <Link to="/map" className="hover:text-white">Parking map</Link>
          </nav>
          <div className="flex flex-col gap-2.5 text-white/80">
            <div className="flex gap-5">
              {socials.map(({ label, href, path }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-white/80 transition-colors hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
            <a href="mailto:bpat.toronto@gmail.com" className="mt-2 hover:text-white">bpat.toronto@gmail.com</a>
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} BPAT. Made in Toronto.
        </p>
      </div>
    </footer>
  )
}

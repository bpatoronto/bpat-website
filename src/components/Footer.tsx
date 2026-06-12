import { Link } from 'react-router-dom'
import Logo from './Logo'

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2.2c3.2 0 3.6 0 4.8.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.81 0 3.17-.01 3.54-.07 4.81-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.81.07-3.16 0-3.54-.01-4.8-.07-3.27-.15-4.78-1.7-4.93-4.93C2.2 15.55 2.2 15.17 2.2 12c0-3.16.01-3.53.07-4.8.15-3.23 1.66-4.78 4.92-4.93C8.46 2.2 8.84 2.2 12 2.2Zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2Zm0 2.2a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8Zm6.35-3.8a1.42 1.42 0 1 0 0 2.85 1.42 1.42 0 0 0 0-2.85Z',
  },
  {
    label: 'X',
    href: 'https://x.com',
    path: 'M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.38l7.24-8.28L2.8 2h6.39l4.41 5.83L18.9 2Zm-1.1 18.13h1.73L7.36 3.77H5.5l12.3 16.36Z',
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app',
    path: 'M5.43 3.62C7.96 5.51 10.68 9.36 11.68 11.42c1-2.06 3.72-5.9 6.25-7.8 1.83-1.37 4.79-2.43 4.79.94 0 .67-.39 5.66-.61 6.47-.79 2.81-3.65 3.53-6.19 3.1 4.45.75 5.58 3.25 3.13 5.74-4.64 4.74-6.67-1.19-7.23-2.7-.1-.28-.15-.41-.15-.3 0-.11-.05.02-.15.3-.56 1.51-2.59 7.44-7.23 2.7-2.44-2.5-1.32-5 3.13-5.74-2.54.43-5.4-.28-6.18-3.1-.23-.8-.62-5.8-.62-6.47 0-3.37 2.96-2.31 4.8-.94Z',
  },
]

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
            <Link to="/map" className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white">Gap Map</Link>
            <Link to="/#join" className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white">Get Involved</Link>
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
            © {new Date().getFullYear()} Bike Parking Alliance of Toronto. Every ride ends at a rack.
          </p>
          <p className="text-xs text-white/70">
            Made with care in Toronto · <a href="mailto:hello@bpat.ca" className="underline decoration-white/30 underline-offset-2 hover:text-white">hello@bpat.ca</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoMark } from './Logo'

const links = [
  { to: '/#problem', label: 'The problem' },
  { to: '/#approach', label: 'How it works' },
  { to: '/#team', label: 'Team' },
  { to: '/map', label: 'Parking map' },
]

/** Site header. Pages without a photo hero pass `solid` to start on the light bar. */
export default function Nav({ solid = false }: { solid?: boolean }) {
  // top: clear over the photo, dark: over the photo once scrolled, solid: past the hero
  const [mode, setMode] = useState<'top' | 'dark' | 'solid'>('top')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setMode(y > window.innerHeight * 0.75 ? 'solid' : y > 24 ? 'dark' : 'top')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = solid || mode === 'solid' || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1100] border-b transition-colors duration-300 ${
        light
          ? 'border-pine-950/10 bg-paper/95 text-pine-950'
          : mode === 'dark'
            ? 'border-white/10 bg-pine-950/90 text-white'
            : 'border-transparent text-white'
      }`}
    >
      <nav className="container-pg flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8 shrink-0" />
          <span className="text-[1.05rem] font-semibold">BPAT</span>
          <span className={`hidden text-sm lg:inline ${light ? 'text-pine-900/75' : 'text-white/70'}`}>
            Bike Parking Alliance of Toronto
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-[0.95rem] transition-colors ${light ? 'text-pine-900/80 hover:text-pine-950' : 'text-white/85 hover:text-white'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="container-pg flex flex-col pb-4 md:hidden">
          {links.map(({ to, label }) => (
            <li key={to} className="border-t border-pine-950/10">
              <Link to={to} onClick={() => setOpen(false)} className="block py-3.5 text-base text-pine-950">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

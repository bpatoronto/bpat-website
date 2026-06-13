import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useDesignStyle } from '../design-context'

const links = [
  { to: '/#problem', label: 'The Problem' },
  { to: '/#approach', label: 'Our Approach' },
  { to: '/map', label: 'Gap Map' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  // CTA waits until the reader is well past the hero, then animates in
  const [showCta, setShowCta] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { style } = useDesignStyle()
  // On the map page there's no hero to float over — keep the glass on
  const solid = scrolled || pathname !== '/'
  // Over the dusk scene hero the bar is transparent, so type flips to white;
  // the abstract hero is light, so type stays dark
  const onDark = !solid && style === 'scene'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setShowCta(window.scrollY > window.innerHeight * 1.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-[1100] px-4 pt-4 md:px-6">
      <nav
        className={`container-pg flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 md:px-7 ${
          solid
            ? 'border-white/60 bg-white/55 text-pine-900 shadow-[0_12px_40px_-16px_rgba(23,55,58,0.35)] backdrop-blur-xl'
            : `border-transparent bg-transparent ${onDark ? 'text-white' : 'text-pine-900'}`
        }`}
      >
        <Logo className={`transition-colors duration-500 ${onDark ? 'text-white' : 'text-pine-900'}`} />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${
                  onDark ? 'text-white/95 hover:text-white' : 'text-pine-900 hover:text-pine-600'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Primary CTA — appears top right well past the hero, animating in.
              Hidden on mobile: the pill is too tight, and the menu has its own CTA. */}
          <Link
            to="/#join"
            tabIndex={showCta ? 0 : -1}
            aria-hidden={!showCta}
            className={`btn-solid hidden px-6! py-2.5! transition-all duration-500 md:inline-flex ${
              showCta
                ? 'translate-y-0 opacity-100 shadow-[0_14px_38px_-10px_rgba(39,98,102,0.95)]!'
                : 'pointer-events-none -translate-y-3 opacity-0'
            }`}
          >
            Get involved
          </Link>

          {/* Mobile toggle */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 md:hidden ${
              onDark ? 'text-white' : 'text-pine-900'
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="container-pg mt-2 rounded-3xl border border-white/80 bg-white/95 p-6 shadow-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.18em] text-pine-900"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/#join" onClick={() => setOpen(false)} className="btn-solid w-full">
                Get involved
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

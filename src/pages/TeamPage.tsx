import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'

type Member = {
  name: string
  role: string
  linkedin?: string
  instagram?: string
}

const members: Member[] = [
  { name: 'Hafeez Alavi', role: 'Founder and Executive Director' },
  { name: 'Joel Matthew', role: 'Policy and Research Analyst' },
  { name: 'Rae Mahboob', role: 'Social Media Coordinator' },
  { name: 'Richard Li', role: 'Software Developer' },
  { name: 'Ben Corrigan', role: 'Community and Stakeholder Relations' },
  { name: 'Kyla Yu', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Gregory Campos-Hohn', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Emily Villett', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Rayyan Mia', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Ana Marelja', role: 'Property Outreach Coordinator' },
  { name: 'Zachary Osborn', role: 'Property Outreach Coordinator' },
  { name: 'Aaryan Dave', role: 'Grants and Partnerships Coordinator' },
  { name: 'Kyla Howe', role: 'Social Media Coordinator' },
]

const headshotOf = (name: string) =>
  `/headshots/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const socialIcons = {
  linkedin: {
    label: 'LinkedIn',
    path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.16h4.56V23H.22V8.16Zm7.34 0h4.37v2.02h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.2h-4.55v-7.27c0-1.73-.03-3.96-2.41-3.96-2.42 0-2.79 1.89-2.79 3.84V23H7.56V8.16Z',
  },
  instagram: {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.8.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.81 0 3.17-.01 3.54-.07 4.81-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.81.07-3.16 0-3.54-.01-4.8-.07-3.27-.15-4.78-1.7-4.93-4.93C2.2 15.55 2.2 15.17 2.2 12c0-3.16.01-3.53.07-4.8.15-3.23 1.66-4.78 4.92-4.93C8.46 2.2 8.84 2.2 12 2.2Zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2Zm0 2.2a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8Zm6.35-3.8a1.42 1.42 0 1 0 0 2.85 1.42 1.42 0 0 0 0-2.85Z',
  },
} as const

/** Headshot that falls back to an initials disc when the photo is missing. */
function Headshot({ member, className }: { member: Member; className: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-pine-600 font-bold text-white`}>
        {initialsOf(member.name)}
      </div>
    )
  }
  return (
    <img
      src={headshotOf(member.name)}
      alt={member.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} bg-pine-600 object-cover`}
    />
  )
}

function SocialLinks({ member, dark = false }: { member: Member; dark?: boolean }) {
  const links = (['linkedin', 'instagram'] as const)
    .filter((key) => member[key])
    .map((key) => ({ href: member[key]!, ...socialIcons[key] }))
  if (links.length === 0) return null

  const style = dark
    ? 'border-white/25 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
    : 'border-pine-600/30 bg-white/85 text-pine-700 hover:border-pine-600/50 hover:bg-white'

  return (
    <div className="flex gap-3">
      {links.map(({ href, label, path }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on ${label}`}
          onClick={(e) => e.stopPropagation()}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 ${style}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d={path} />
          </svg>
        </a>
      ))}
    </div>
  )
}

export default function TeamPage() {
  const [selected, setSelected] = useState<Member | null>(null)

  // Close on Escape and lock page scroll while the detail card is open
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [selected])

  return (
    <>
      <Nav />
      <main className="relative overflow-hidden bg-pine-50 pb-24 pt-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(#276266 1px, transparent 1px), linear-gradient(90deg, #276266 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />

        <div className="container-pg relative">
          <Reveal>
            <h1 className="max-w-2xl text-balance text-3xl font-bold text-pine-950 md:text-5xl">
              Meet the team.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pine-900/85">
              Youth-led planners and advocates running this team, and growing.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 100} className="h-full">
                <motion.button
                  type="button"
                  layoutId={`card-${member.name}`}
                  onClick={() => setSelected(member)}
                  whileHover={{ y: -4 }}
                  className="glass flex h-full w-full cursor-pointer flex-col items-start p-7 text-left"
                >
                  <motion.div layoutId={`photo-${member.name}`} className="h-28 w-28">
                    <Headshot member={member} className="h-full w-full rounded-full text-2xl" />
                  </motion.div>
                  <h2 className="mt-5 text-base font-semibold text-pine-950">{member.name}</h2>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-pine-600">{member.role}</p>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-pine-950/50 p-6"
            >
              <motion.div
                layoutId={`card-${selected.name}`}
                role="dialog"
                aria-modal="true"
                aria-label={selected.name}
                onClick={(e) => e.stopPropagation()}
                className="glass relative w-full max-w-lg bg-white p-8 md:p-10"
              >
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-pine-700 transition-colors hover:bg-pine-600/10"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>

                <motion.div layoutId={`photo-${selected.name}`} className="h-40 w-40">
                  <Headshot member={selected} className="h-full w-full rounded-full text-4xl" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <h2 className="mt-6 text-xl font-bold text-pine-950">{selected.name}</h2>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-pine-600">{selected.role}</p>

                  <div className="mt-8">
                    <SocialLinks member={selected} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

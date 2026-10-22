import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Stagger from '../components/home/Stagger'
import { members, headshotOf, headshotThumbOf, initialsOf, type Member } from '../data/team'

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
function Headshot({ member, className, thumb = false }: { member: Member; className: string; thumb?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-pine-600 font-semibold text-white`}>
        {initialsOf(member.name)}
      </div>
    )
  }
  return (
    <img
      src={thumb ? headshotThumbOf(member.name) : headshotOf(member.name)}
      alt={member.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} bg-pine-600 object-cover`}
    />
  )
}

function SocialLinks({ member }: { member: Member }) {
  const links = (['linkedin', 'instagram'] as const)
    .filter((key) => member[key])
    .map((key) => ({ href: member[key]!, ...socialIcons[key] }))
  if (links.length === 0) return null

  const style = 'border-pine-950/15 text-pine-800 hover:border-pine-950/40 hover:text-pine-950'

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
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${style}`}
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
      <Helmet>
        <title>BPAT Team – Meet the Bike Parking Alliance of Toronto</title>
        <meta name="description" content="Meet the BPAT team — the youth-led planners and advocates building secure bike parking across Toronto." />
        <link rel="canonical" href="https://bpat.ca/team" />
      </Helmet>
      <Nav solid />
      <main className="bg-paper pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="container-pg">
          <h1 className="max-w-3xl text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-pine-950 md:text-7xl">
            Meet the team.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pine-900/80 md:text-xl">
            Youth-led planners and advocates running this team, and growing.
          </p>

          <Stagger className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-20 md:grid-cols-3 lg:grid-cols-4">
            {members.map((member) => (
              <motion.button
                key={member.name}
                type="button"
                layoutId={`card-${member.name}`}
                onClick={() => setSelected(member)}
                className="group flex cursor-pointer flex-col items-start border-t-2 border-pine-950 pt-5 text-left"
              >
                <motion.div layoutId={`photo-${member.name}`} className="h-24 w-24 md:h-28 md:w-28">
                  <Headshot member={member} thumb className="h-full w-full rounded-full text-2xl ring-2 ring-paper transition-transform duration-300 group-hover:scale-105" />
                </motion.div>
                <h2 className="mt-5 text-[0.95rem] font-semibold leading-tight text-pine-950">{member.name}</h2>
                <p className="mt-1 text-sm leading-snug text-pine-900/75">{member.role}</p>
              </motion.button>
            ))}
          </Stagger>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[1200] flex items-center justify-center bg-pine-950/55 p-6"
            >
              <motion.div
                layoutId={`card-${selected.name}`}
                role="dialog"
                aria-modal="true"
                aria-label={selected.name}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-[22px] bg-white p-8 shadow-[0_50px_90px_-40px_rgba(11,33,35,0.7)] md:p-10"
              >
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-pine-800 transition-colors hover:bg-pine-950/5"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>

                <motion.div layoutId={`photo-${selected.name}`} className="h-40 w-40">
                  <Headshot member={selected} className="h-full w-full rounded-full text-4xl" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <h2 className="mt-6 text-2xl font-semibold tracking-[-0.015em] text-pine-950">{selected.name}</h2>
                  <p className="mt-1.5 text-pine-900/75">{selected.role}</p>

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

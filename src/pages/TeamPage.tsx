import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'

type Member = {
  name: string
  role: string
  blurb: string
}

// Placeholder roster — swap in real names, photos and bios as the team forms.
const members: Member[] = [
  { name: 'Richard L.', role: 'Founder', blurb: 'Started BPAT after one too many rides that ended with nowhere to lock up.' },
  { name: 'Open seat', role: 'Mapping & Infrastructure Lead', blurb: 'Documents bike parking gaps across the city with mapping tools and street imagery.' },
  { name: 'Open seat', role: 'Property Outreach Lead', blurb: 'Talks to plaza and apartment owners and turns conversations into installed racks.' },
  { name: 'Open seat', role: 'Policy & Research Lead', blurb: 'Digs into bylaws, incentives and best practices from cities that got this right.' },
]

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export default function TeamPage() {
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
            <p className="eyebrow text-pine-600">Meet the team</p>
            <h1 className="mt-5 max-w-2xl text-balance text-3xl font-bold uppercase tracking-[0.08em] text-pine-950 md:text-5xl">
              The people behind the racks.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pine-900/85">
              BPAT is small, volunteer-built and growing. Most of these seats are still open —
              which means the next name on this page could be yours.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map(({ name, role, blurb }, i) => (
              <Reveal key={role} delay={(i % 4) * 100} className="h-full">
                <article className="glass flex h-full flex-col items-start p-7">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${
                      name === 'Open seat'
                        ? 'border-2 border-dashed border-pine-400 text-pine-500'
                        : 'bg-pine-600 text-white'
                    }`}
                  >
                    {name === 'Open seat' ? '?' : initialsOf(name)}
                  </span>
                  <h2 className="mt-5 text-base font-semibold text-pine-950">{name}</h2>
                  <p className="eyebrow mt-1.5 text-[0.6rem] tracking-[0.2em] text-pine-600">{role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-pine-900/85">{blurb}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="mt-14 flex flex-col items-start gap-4">
              <Link to="/#join" className="btn-solid">
                Take a seat — get involved
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12m-5-5 5 5-5 5" />
                </svg>
              </Link>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-pine-700">
                3–8 hours a week · Toronto-based & remote
              </p>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  )
}

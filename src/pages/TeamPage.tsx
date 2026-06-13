import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'

type Member = {
  name: string
  role: string
  also?: string[]
}

const members: Member[] = [
  { name: 'Hafeez Alavi', role: 'Founder' },
  { name: 'Zach Osborn', role: 'Policy Researcher', also: ['Mapping Researcher', 'Property Outreach'] },
  { name: 'Emily Villett', role: 'Mapping & Infrastructure Researcher', also: ['Policy & Research Analyst', 'Property Outreach Coordinator'] },
  { name: 'Joel', role: 'Policy Researcher', also: ['Mapping & Infrastructure', 'Property Outreach Coordinator'] },
  { name: 'Aaryan', role: 'Mapping & Infrastructure', also: ['Grants & Partnerships'] },
  { name: 'Richard', role: 'Web Developer' },
  { name: 'Kyla Yu', role: 'Mapping & Infrastructure', also: ['Grants & Partnerships'] },
  { name: 'Ben', role: 'Community & Stakeholder', also: ['Policy & Research'] },
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
              Small, volunteer-built and growing — there&rsquo;s room for you too.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map(({ name, role, also }, i) => (
              <Reveal key={name} delay={(i % 4) * 100} className="h-full">
                <article className="glass flex h-full flex-col items-start p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pine-600 text-lg font-bold text-white">
                    {initialsOf(name)}
                  </span>
                  <h2 className="mt-5 text-base font-semibold text-pine-950">{name}</h2>
                  <p className="eyebrow mt-1.5 text-[0.6rem] tracking-[0.2em] text-pine-600">{role}</p>
                  {also && (
                    <p className="mt-3 text-xs leading-relaxed text-pine-900/70">
                      Also: {also.join(' · ')}
                    </p>
                  )}
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

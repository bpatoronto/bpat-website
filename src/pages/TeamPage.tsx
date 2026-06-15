import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'

type Member = {
  name: string
  role: string
}

const members: Member[] = [
  { name: 'Hafeez Alavi', role: 'Founder and Executive Director' },
  { name: 'Joel Matthew', role: 'Policy and Research Analyst' },
  { name: 'Rae Mahboob', role: 'Social Media Coordinator' },
  { name: 'Richard Li', role: 'Web Developer' },
  { name: 'Ben Corrigan', role: 'Community and Stakeholder Relations' },
  { name: 'Kyla Yu', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Gregory Campos-Hohn', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Emily Villett', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Rayyan Mia', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Ana Marelja', role: 'Property Outreach Coordinator' },
  { name: 'Zachary Osborn', role: 'Property Outreach Coordinator' },
  { name: 'Aaryan Dave', role: 'Grants and Partnerships Coordinator' },
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
              Youth-led planners and advocates running this team, and growing.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map(({ name, role }, i) => (
              <Reveal key={name} delay={(i % 4) * 100} className="h-full">
                <article className="glass flex h-full flex-col items-start p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pine-600 text-lg font-bold text-white">
                    {initialsOf(name)}
                  </span>
                  <h2 className="mt-5 text-base font-semibold text-pine-950">{name}</h2>
                  <p className="eyebrow mt-1.5 text-[0.6rem] tracking-[0.2em] text-pine-600">{role}</p>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

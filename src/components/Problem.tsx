import Reveal from './Reveal'

const statements = [
  <>
    Swaths of car parking. <span className="text-pine-600">Not a single place to lock a bike.</span>
  </>,
  <>
    No secure storage at home. <span className="text-pine-600">Bikes in elevators, hallways and living rooms.</span>
  </>,
  <>
    People want to ride. <span className="text-pine-600">The city gives them nowhere to stop.</span>
  </>,
]

const issues = [
  {
    number: '01',
    title: 'The Suburban Plaza Problem',
    body: 'Suburban plazas and strip malls have swaths of car parking but often not a single bike rack or ring — even when there is plenty of space. Ride to your local store or restaurant and you’ll find there’s nowhere to park: you risk leaving your bike loose, where it can easily be stolen.',
    points: ['Acres of asphalt, zero racks', 'Short local trips made impossible', 'Theft risk at every errand'],
  },
  {
    number: '02',
    title: 'The Apartment Building Problem',
    body: 'Apartment communities built in the 50s and 60s often lack the dedicated, secure bike parking that newer buildings are required to have. Residents haul bikes up crowded elevators into their units — or give up on owning a bike altogether.',
    points: ['No secure rooms in postwar towers', 'Bikes squeezed into small units', 'E-bike ownership off the table'],
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* faint planning-grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(#276266 1px, transparent 1px), linear-gradient(90deg, #276266 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div className="container-pg relative">
        {/* Mission intro, planning-document style */}
        <Reveal>
          <p className="eyebrow text-center text-pine-600">The problem</p>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xl font-medium leading-relaxed text-pine-900 md:text-2xl">
            Bike lanes are the vital &ldquo;in-between&rdquo; — but bike parking is the crucial
            start and end of every ride, <span className="font-semibold text-pine-600">and it is sorely lacking in Toronto.</span>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-pine-900/85">
            It&rsquo;s the overlooked issue that stops people from biking to their local
            destinations — or from owning a bike at all. We&rsquo;re focused on two critical gaps.
          </p>
        </Reveal>

        {/* Civic statements */}
        <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-10 border-l-4 border-pine-600 pl-7 md:pl-10">
          {statements.map((statement, i) => (
            <Reveal key={i} delay={i * 120}>
              <p className="statement text-pine-950">{statement}</p>
            </Reveal>
          ))}
        </div>

        {/* The two issues */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {issues.map(({ number, title, body, points }, i) => (
            <Reveal key={number} delay={i * 150} className="h-full">
              <article className="glass grain relative flex h-full flex-col overflow-hidden p-9 md:p-11">
                <span className="absolute -right-3 -top-7 select-none text-[7rem] font-bold leading-none text-pine-600/8">
                  {number}
                </span>
                <p className="eyebrow text-pine-600">Issue {number}</p>
                <h3 className="mt-4 text-2xl font-semibold uppercase tracking-[0.06em] text-pine-950">
                  {title}
                </h3>
                <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-pine-900/90">{body}</p>
                <ul className="mt-7 flex flex-col gap-2.5 border-t border-pine-600/10 pt-6">
                  {points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-medium text-pine-800">
                      <svg viewBox="0 0 64 64" className="h-3.5 w-3.5 shrink-0 text-pine-600" fill="none" stroke="currentColor" strokeWidth="9">
                        <circle cx="32" cy="24" r="13" />
                        <line x1="32" y1="37" x2="32" y2="56" strokeLinecap="round" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

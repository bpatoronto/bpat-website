import Reveal from './Reveal'

const guides = [
  {
    audience: 'Plaza & storefront owners',
    title: 'A rack outside your door, this season',
    points: [
      'About $XXX installed (placeholder figure)',
      'Fits in half a parking spot or unused concrete',
      'We scope the site and recommend vendors',
    ],
    cta: { label: 'Get the plaza guide', href: 'mailto:hello@bpat.ca?subject=Bike%20parking%20for%20my%20plaza' },
  },
  {
    audience: 'Apartment owners & managers',
    title: 'Secure storage your tenants will use',
    points: [
      'Convert a garage corner or dead space by the elevators',
      'Retains tenants, makes e-bike ownership possible',
      'Retrofits for postwar towers — no new construction',
    ],
    cta: { label: 'Get the building guide', href: 'mailto:hello@bpat.ca?subject=Bike%20parking%20for%20my%20building' },
  },
]

export default function Owners() {
  return (
    <section id="owners" className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="container-pg">
        <Reveal>
          <p className="eyebrow text-center text-pine-600">For property owners</p>
          <h2 className="mt-6 text-center text-2xl font-bold uppercase tracking-[0.08em] text-pine-950 sm:text-3xl md:text-4xl">
            Have space? Here&rsquo;s how easy it is.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-pine-900/85 md:mt-6">
            A few hundred dollars and a patch of concrete. We handle the rest.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {guides.map(({ audience, title, points, cta }, i) => (
            <Reveal key={audience} delay={i * 150} className="h-full">
              <article className="glass grain relative flex h-full flex-col overflow-hidden p-7 md:p-10">
                <p className="eyebrow text-pine-600">{audience}</p>
                <h3 className="mt-4 text-lg font-semibold uppercase tracking-[0.06em] text-pine-950 md:text-2xl">
                  {title}
                </h3>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-pine-900/90">
                      <svg viewBox="0 0 64 64" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pine-600" fill="none" stroke="currentColor" strokeWidth="9">
                        <circle cx="32" cy="24" r="13" />
                        <line x1="32" y1="37" x2="32" y2="56" strokeLinecap="round" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <a href={cta.href} className="btn-solid mt-8 self-start px-7!">
                  {cta.label}
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12m-5-5 5 5-5 5" />
                  </svg>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

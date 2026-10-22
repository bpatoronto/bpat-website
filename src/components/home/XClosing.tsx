import { useState, type ReactNode } from 'react'
import { Arrow } from './Stagger'

const guides = [
  {
    audience: 'Plaza and storefront owners',
    title: 'A rack outside your door, this season',
    points: ['Fits in half a parking spot or unused concrete', 'We scope the site and recommend vendors'],
    cta: { label: 'Get the plaza guide', href: 'mailto:bpat.toronto@gmail.com?subject=Bike%20parking%20for%20my%20plaza' },
  },
  {
    audience: 'Apartment owners and managers',
    title: 'Secure storage your tenants will use',
    points: [
      'Convert a garage corner or dead space by the elevators',
      'Retains tenants, makes e-bike ownership possible',
      'Retrofits for postwar towers, no new construction',
    ],
    cta: { label: 'Get the building guide', href: 'mailto:bpat.toronto@gmail.com?subject=Bike%20parking%20for%20my%20building' },
  },
]

export function XOwners() {
  return (
    <section id="owners" className="bg-white py-20 md:py-32">
      <div className="container-pg">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-pine-950 md:text-5xl">
          Have space? A few hundred dollars and a patch of concrete.
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {guides.map(({ audience, title, points, cta }) => (
            <article key={audience} className="flex flex-col border-t-2 border-pine-950 pt-6">
              <p className="text-sm text-pine-900/75">{audience}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.015em] text-pine-950">{title}</h3>
              <ul className="mt-5 flex flex-1 flex-col gap-2 text-[0.95rem] leading-relaxed text-pine-900/80">
                {points.map((point) => (
                  <li key={point} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-pine-600" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href={cta.href} className="group mt-7 inline-flex items-center gap-2 self-start font-medium text-pine-700 underline decoration-pine-600/30 underline-offset-4 hover:decoration-pine-600">
                {cta.label}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const inlineLink = 'text-pine-700 underline decoration-pine-600/30 underline-offset-2 hover:decoration-pine-600'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'What is BPAT?',
    a: "BPAT stands for the Bike Parking Alliance of Toronto. We're a grassroots group that maps where bike parking is missing in Toronto and works directly with property owners to get racks installed.",
  },
  {
    q: 'How does BPAT get bike racks installed?',
    a: 'Three steps: we map the gaps and identify who owns the property, we make the case to owners (low cost, space they already have, vendors included), and when the owner says yes, the rack goes in.',
  },
  {
    q: 'Where does BPAT operate?',
    a: 'Across Toronto. We focus on suburban plazas and older apartment buildings, the two places with the worst bike parking gaps.',
  },
  {
    q: 'How can I get involved?',
    a: (
      <>
        Email <a href="mailto:bpat.toronto@gmail.com" className={inlineLink}>bpat.toronto@gmail.com</a> or
        follow us on <a href="https://www.instagram.com/bpat.toronto/" target="_blank" rel="noreferrer" className={inlineLink}>Instagram</a>,{' '}
        <a href="https://x.com/BPAT_Toronto" target="_blank" rel="noreferrer" className={inlineLink}>X</a>, or{' '}
        <a href="https://bsky.app/profile/bpat-toronto.bsky.social" target="_blank" rel="noreferrer" className={inlineLink}>Bluesky</a>.
        We&rsquo;re always looking for people who want to help map gaps or talk to property owners.
      </>
    ),
  },
  {
    q: 'Does BPAT work with the City of Toronto?',
    a: 'Our approach is to go directly to property owners rather than wait for city policy. But every rack we install builds the case for future city incentives and requirements.',
  },
]

export function XFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container-pg grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
        <h2 className="text-3xl font-semibold tracking-tight text-pine-950 md:text-5xl">Questions</h2>
        <div className="border-b border-pine-950/12">
          {faqs.map(({ q, a }, i) => (
            <details
              key={q}
              className="group border-t border-pine-950/12 py-5"
              open={open === i}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) setOpen(i)
                else if (open === i) setOpen(null)
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-pine-950 [&::-webkit-details-marker]:hidden">
                {q}
                <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-pine-600 transition-transform duration-200 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-pine-900/80">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

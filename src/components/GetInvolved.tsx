import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const paths = [
  {
    audience: 'For residents & riders',
    title: 'Tell us where parking is missing',
    blurb:
      'Know a spot where you wish you could lock up? Drop a pin — every pin builds the case we bring to owners and the city.',
    cta: { label: 'Pin a spot on the map', to: '/map' },
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
  {
    audience: 'For apartment & plaza owners',
    title: 'Add parking on your property',
    blurb:
      'A ring-and-post costs about $500 installed. We’ll walk you through every step, from siting to vendors.',
    cta: { label: 'Learn how', href: '#owners' },
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
        <path d="M15 9h3a2 2 0 0 1 2 2v10" />
        <path d="M2 21h20" />
        <path d="M8 7h2m-2 4h2m-2 4h2" />
      </svg>
    ),
  },
  {
    audience: 'For councillors & city staff',
    title: 'Explore a bike parking incentive or grant',
    blurb:
      'A small incentive or grant would let owners install racks at little or no cost. We bring the documented gaps and community demand to make the case.',
    cta: { label: 'Explore the incentive', href: 'mailto:hello@bpat.ca?subject=Bike%20parking%20incentive%20or%20grant%20for%20my%20ward' },
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V10m14 11V10" />
        <path d="M3 10h18L12 3 3 10Z" />
        <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
      </svg>
    ),
  },
]

export default function GetInvolved() {
  return (
    <section id="join" className="relative overflow-hidden bg-pine-50 py-24 md:py-32">
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
          <p className="eyebrow text-center text-pine-600">Get involved</p>
          <h2 className="mt-6 text-center text-3xl font-bold uppercase tracking-[0.08em] text-pine-950 md:text-5xl">
            Whoever you are, there&rsquo;s a way in.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-pine-900/85">
            Residents, property owners, city hall — pick your path. Each one gets a rack in the
            ground.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {paths.map(({ audience, title, blurb, cta, icon }, i) => (
            <Reveal key={audience} delay={i * 120} className="h-full">
              <article className="glass group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_-16px_rgba(23,55,58,0.3)] md:p-8">
                <span className="text-pine-600 transition-transform duration-300 group-hover:-rotate-6">{icon}</span>
                <p className="eyebrow mt-5 text-pine-600">{audience}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-pine-950">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-pine-900/85">{blurb}</p>
                {'to' in cta && cta.to ? (
                  <Link to={cta.to} className="btn-solid mt-6 w-full px-5!">
                    {cta.label}
                  </Link>
                ) : (
                  <a href={cta.href} className="btn-glass mt-6 w-full px-5!">
                    {cta.label}
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10h12m-5-5 5 5-5 5" />
                    </svg>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-14 text-center text-sm text-pine-900/80">
            Want to volunteer on the alliance itself? We&rsquo;d love that too —{' '}
            <a href="mailto:hello@bpat.ca?subject=I%20want%20to%20help%20BPAT" className="font-semibold text-pine-700 underline decoration-pine-600/40 underline-offset-2 hover:text-pine-600">
              hello@bpat.ca
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

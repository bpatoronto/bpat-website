import { useState } from 'react'
import Reveal from './Reveal'

const faqs = [
  {
    q: 'What is BPAT?',
    a: 'BPAT stands for the Bike Parking Alliance of Toronto. We're a grassroots group that maps where bike parking is missing in Toronto and works directly with property owners to get racks installed.',
  },
  {
    q: 'What does BPAT stand for?',
    a: 'BPAT stands for Bike Parking Alliance of Toronto — a volunteer-led advocacy group focused on getting secure bicycle parking built across the city.',
  },
  {
    q: 'How does BPAT get bike racks installed?',
    a: 'BPAT follows three steps: first, we map the gaps and identify who owns the property. Then we make the case to owners — low cost, space they already have, vendors included. Finally, when the owner says yes, the rack goes in.',
  },
  {
    q: 'Where does BPAT operate?',
    a: 'BPAT operates across Toronto, Ontario, Canada. We focus on suburban plazas and older apartment buildings — the two areas with the worst bike parking gaps.',
  },
  {
    q: 'How can I get involved with BPAT?',
    a: 'Email bpat.toronto@gmail.com or follow us on Instagram (@bpat.toronto), X (@BPAT_Toronto), or Bluesky. We're always looking for people who want to help map gaps or talk to property owners.',
  },
  {
    q: 'Does BPAT work with the City of Toronto?',
    a: 'BPAT's approach is to go directly to property owners rather than wait for city policy. But every rack we install builds the case for future city incentives and requirements.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="container-pg">
        <Reveal>
          <p className="eyebrow text-center text-pine-600">FAQ</p>
          <h2 className="mt-6 text-center text-2xl font-bold uppercase tracking-[0.08em] text-pine-950 sm:text-3xl md:text-4xl">
            Questions about BPAT
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-pine-600/10">
          {faqs.map(({ q, a }, i) => (
            <Reveal key={i} delay={i * 80}>
              <details
                className="group py-5"
                open={open === i}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) setOpen(i)
                  else if (open === i) setOpen(null)
                }}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-pine-950 md:text-lg">
                  {q}
                  <svg
                    viewBox="0 0 20 20"
                    className="h-5 w-5 shrink-0 text-pine-600 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-pine-900/85 md:text-base">
                  {a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

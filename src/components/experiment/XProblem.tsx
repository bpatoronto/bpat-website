import { useState } from 'react'
import Stagger from './Stagger'

const frame =
  'mx-auto block aspect-[9/16] w-full max-w-[min(100%,calc(82svh*9/16))] overflow-hidden rounded-2xl border-0 bg-pine-600 lg:max-w-none'

/** Poster until pressed, so YouTube's player (and its cookies) only load on demand. */
function Short() {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src="https://www.youtube-nocookie.com/embed/5W0vdAh3J0E?autoplay=1&playsinline=1"
        title="BPAT on YouTube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={frame}
      />
    )
  }

  return (
    <button type="button" onClick={() => setPlaying(true)} className={`group relative ${frame}`} aria-label="Play the BPAT video">
      <img src="/video-poster.webp" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pine-950/80 text-white transition-transform group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" /></svg>
        </span>
      </span>
    </button>
  )
}

const statements = [
  ['Swaths of car parking.', 'Not a single place to lock a bike.'],
  ['No secure bike parking in older apartment buildings.', 'Elevators are already packed.'],
  ['People want to ride.', 'The city gives them nowhere to lock.'],
]

const issues = [
  {
    title: 'Suburban plazas',
    body: 'Acres of car parking, often not a single rack. Ride to the store and there’s nowhere safe to lock up.',
    points: ['Acres of asphalt, zero racks', 'Short trips made impossible', 'Theft risk at every errand'],
  },
  {
    title: 'Apartment buildings',
    body: 'Postwar towers rarely have secure bike storage. Residents haul bikes up elevators, or give up on owning one.',
    points: ['No secure rooms in postwar towers', 'Bikes squeezed into small units', 'E-bike ownership off the table'],
  },
]

export default function XProblem() {
  return (
    <section id="problem" className="scroll-mt-16 pb-20 pt-8 md:pb-32 md:pt-12">
      <div className="container-pg">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
          <div>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-pine-950 md:text-5xl">
              Every ride starts and ends at a place to park. Toronto is short on them.
            </h2>

            <Stagger as="ul" className="mt-12 md:mt-16">
              {statements.map(([lead, follow]) => (
                <li key={lead} className="border-t border-pine-950/12 py-6 text-xl leading-snug text-pine-950 md:py-8 md:text-[1.7rem]">
                  {lead} <span className="text-pine-600">{follow}</span>
                </li>
              ))}
            </Stagger>
          </div>

          {/* On phones the page catches on the video (scroll-snap) so it lands fully in view */}
          <div className="x-snap-target lg:sticky lg:top-28 lg:self-start">
            <Short />
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-2 md:gap-16">
          {issues.map(({ title, body, points }, i) => (
            <article key={title} className="border-t-2 border-pine-950 pt-6">
              <p className="text-sm text-pine-900/75">Gap {i + 1}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.015em] text-pine-950 md:text-3xl">{title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-pine-900/80">{body}</p>
              <ul className="mt-6 flex flex-col gap-2 text-[0.95rem] text-pine-900">
                {points.map((point) => (
                  <li key={point} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-pine-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

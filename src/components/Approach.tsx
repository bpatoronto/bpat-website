import Reveal from './Reveal'
import deepScene from '../assets/bg-deep.svg'
import deepAbstract from '../assets/bg-deep-abstract.svg'
import { useDesignStyle } from '../design-context'

const steps = [
  {
    step: 'Step 1',
    title: 'Map the gaps',
    body: 'We document where bike parking is missing across Toronto — locations, available space, and who owns the property.',
  },
  {
    step: 'Step 2',
    title: 'Make the case',
    body: 'We go to owners directly with the benefit, the low cost, and the space already sitting there — vendors included.',
  },
  {
    step: 'Step 3',
    title: 'Get racks in the ground',
    body: 'Owner says yes, rack goes in, the neighbourhood gains a place to park. Every install builds momentum.',
  },
]

export default function Approach() {
  const { style } = useDesignStyle()

  return (
    <section id="approach" className="grain relative isolate overflow-hidden py-24 text-white md:py-32">
      <img
        src={style === 'scene' ? deepScene : deepAbstract}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="container-pg">
        <Reveal>
          <p className="eyebrow text-pine-200">Our approach</p>
          <h2 className="mt-6 max-w-3xl text-balance text-3xl font-bold uppercase leading-tight tracking-[0.08em] md:text-5xl">
            We don&rsquo;t wait for policy.
            <br />
            <span className="text-pine-200">We go straight to the source.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/90">
            A ring-and-post costs a few hundred dollars installed. So instead of waiting years
            for bylaws to change, we work with property owners today.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map(({ step, title, body }, i) => (
            <Reveal key={step} delay={i * 150} className="h-full">
              <article className="glass-dark group h-full p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-pine-900/60 md:p-9">
                <p className="eyebrow text-pine-200">{step}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-wide">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Future vision band */}
        <Reveal delay={200}>
          <div id="vision" className="glass-dark mt-20 flex scroll-mt-28 flex-col items-start gap-8 p-9 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-pine-200">Where this goes</p>
              <h3 className="mt-4 text-2xl font-semibold uppercase tracking-[0.06em] md:text-3xl">
                Then we change the rules.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
                The eventual goal: city incentives for installation — and one day, requirements.
                Every rack installed now makes that case undeniable.
              </p>
            </div>
            <a href="#join" className="btn-glass-dark shrink-0">
              Help us get there
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

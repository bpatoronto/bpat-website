import Stagger from './Stagger'

const steps = [
  { title: 'Map the gaps', body: 'We document where parking is missing, and who owns the property.' },
  { title: 'Make the case', body: 'We bring owners the case: low cost, space they already own, vendors included.' },
  { title: 'Get racks in the ground', body: 'Owner says yes, rack goes in. Every install builds momentum.' },
]

export default function XApproach() {
  return (
    <section id="approach" className="scroll-mt-16 bg-pine-950 py-20 text-white md:py-32">
      <div className="container-pg">
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
          We don&rsquo;t wait for policy. We go straight to the people who own the space.
        </h2>

        <Stagger as="ol" className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-0">
          {steps.map(({ title, body }, i) => (
            <li key={title} className="border-t border-white/20 pt-6 md:border-l md:border-t-0 md:px-8 md:pt-0 md:first:border-l-0 md:first:pl-0">
              <span className="text-sm tabular-nums text-[#ffd49a]">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] md:text-2xl">{title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{body}</p>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

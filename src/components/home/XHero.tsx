import { Arrow, FORM_URL } from './Stagger'

/** Photo hero that dissolves into the page below it. */
export default function XHero() {
  return (
    <div className="relative isolate overflow-hidden">
      <picture className="absolute inset-0 -z-20">
        <source srcSet="/bike-bg-960.webp 960w, /bike-bg.webp 1600w" sizes="100vw" type="image/webp" />
        <img
          src="/bike-bg.jpeg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_30%]"
        />
      </picture>
      {/* Dark under the headline, then dissolving into the paper background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,33,35,0.74) 0, rgba(11,33,35,0.52) 60svh, rgba(11,33,35,0.3) 92svh, rgba(248,247,243,0.9) calc(100% - 120px), #f8f7f3 calc(100% - 20px))',
        }}
      />

      <section id="top" className="container-pg flex min-h-svh flex-col justify-center pb-24 pt-28 md:pb-32">
        <h1 className="max-w-4xl text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl md:text-[5.25rem]">
          Let&rsquo;s rethink bike parking.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:mt-8 md:text-xl">
          <span className="lg:hidden">The Bike Parking Alliance of Toronto</span>
          <span className="hidden lg:inline">BPAT</span> maps where Toronto is missing bike
          parking and works directly with property owners to get racks in the ground.
        </p>
        <div className="mt-9 md:mt-10">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3.5 text-[0.95rem] font-medium text-pine-950 transition-colors hover:bg-pine-50"
          >
            Request bike parking
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      {/* Room below the fold for the photo to fade out into the page */}
      <div aria-hidden="true" className="h-[22svh]" />
    </div>
  )
}

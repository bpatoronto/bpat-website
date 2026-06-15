export default function Hero() {
  return (
    <section id="top" className="grain relative isolate flex min-h-svh flex-col overflow-hidden">
      <picture className="absolute inset-0 -z-10">
        <source srcSet="/bike-bg.webp" type="image/webp" />
        <img
          src="/bike-bg.jpeg"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>
      {/* dusk wash over the photo so the headline stays legible */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pine-950/70 via-pine-900/55 to-pine-950/80" />

      <div className="container-pg flex flex-1 flex-col items-center justify-center pb-24 pt-32 text-center md:pb-28 md:pt-40">
        <p className="eyebrow mb-6 rounded-full border border-white/30 bg-pine-950/30 px-4 py-2 text-white md:mb-7 md:px-5 md:py-2.5">
          A new alliance for Toronto
        </p>

        <h1 className="text-balance text-4xl font-bold uppercase leading-[1.15] tracking-[0.08em] text-white [text-shadow:0_2px_24px_rgba(20,15,40,0.45)] sm:text-6xl md:text-7xl md:tracking-widest">
          Let&rsquo;s rethink
          <br />
          <span className="text-[#ffd49a]">bike parking.</span>
        </h1>

        <p className="mt-7 max-w-xl text-balance text-base leading-relaxed text-white/95 [text-shadow:0_1px_12px_rgba(20,15,40,0.4)] md:mt-8 md:text-lg">
          Toronto doesn&rsquo;t have nearly enough places to park a bike. We&rsquo;re fixing
          that, one rack at a time.
        </p>

        <div className="mt-10">
          <a href="#join" className="btn-solid">
            Get involved
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12m-5-5 5 5-5 5" />
            </svg>
          </a>
        </div>

      </div>

      {/* Scroll cue, planning-pamphlet style */}
      <a
        href="#problem"
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 text-white"
        aria-label="Scroll to the problem"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.35em]">Learn more</span>
        <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 4v12m-5-5 5 5 5-5" />
        </svg>
      </a>
    </section>
  )
}

import heroScene from '../assets/bg-hero.svg'
import heroAbstract from '../assets/bg-hero-abstract.svg'
import { useDesignStyle } from '../design-context'

const stats = [
  { big: '2', small: 'core gaps we’re closing: plazas & apartments' },
  { big: '~$500', small: 'is all a ring-and-post can cost to install' },
  { big: '0', small: 'racks at far too many places worth biking to' },
]

export default function Hero() {
  const { style } = useDesignStyle()
  const scene = style === 'scene'

  return (
    <section id="top" className="grain relative isolate flex min-h-svh flex-col overflow-hidden">
      <img
        src={scene ? heroScene : heroAbstract}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="container-pg flex flex-1 flex-col items-center justify-center pb-28 pt-40 text-center">
        <p
          className={`eyebrow mb-7 rounded-full border px-5 py-2.5 ${
            scene ? 'border-white/30 bg-pine-950/30 text-white' : 'border-pine-600/20 bg-white/70 text-pine-700'
          }`}
        >
          A new advocacy alliance for Toronto
        </p>

        <h1
          className={`text-balance text-4xl font-bold uppercase leading-[1.15] tracking-[0.08em] sm:text-6xl md:text-7xl md:tracking-widest ${
            scene ? 'text-white [text-shadow:0_2px_24px_rgba(20,15,40,0.45)]' : 'text-pine-950'
          }`}
        >
          Let&rsquo;s rethink
          <br />
          <span className={scene ? 'text-[#ffd49a]' : 'text-pine-600'}>bike parking.</span>
        </h1>

        <p
          className={`mt-8 max-w-2xl text-balance text-base leading-relaxed md:text-lg ${
            scene ? 'text-white/95 [text-shadow:0_1px_12px_rgba(20,15,40,0.4)]' : 'text-pine-900/85'
          }`}
        >
          Every ride begins and ends with a place to park — and Toronto doesn&rsquo;t have
          nearly enough of them. We&rsquo;re changing that, one rack at a time.
        </p>

        <div className="mt-10">
          <a href="#join" className="btn-solid">
            Get involved
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12m-5-5 5 5-5 5" />
            </svg>
          </a>
        </div>

        {/* Floating stat strip */}
        <div
          className={`animate-float mt-16 grid w-full max-w-3xl grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${
            scene ? 'glass-dark divide-white/15' : 'glass divide-pine-600/10'
          }`}
        >
          {stats.map(({ big, small }) => (
            <div key={big} className="flex flex-col items-center gap-1.5 px-6 py-6">
              <span className={`text-3xl font-bold tracking-tight ${scene ? 'text-[#ffd49a]' : 'text-pine-600'}`}>
                {big}
              </span>
              <span className={`max-w-[16rem] text-xs font-medium leading-relaxed ${scene ? 'text-white/90' : 'text-pine-900/80'}`}>
                {small}
              </span>
            </div>
          ))}
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
          <path d="M10 4v12m-5-5 5 5-5 5" />
        </svg>
      </a>
    </section>
  )
}

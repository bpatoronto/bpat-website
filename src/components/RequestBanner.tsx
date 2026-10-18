import Reveal from './Reveal'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeIzRvM1VL7rkrQ9ZaurMjTK3pBn1l3y99egzixBYhRsMswJQ/viewform?usp=preview'

export default function RequestBanner() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-pg">
        <Reveal>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl bg-pine-950 px-6 py-14 text-center text-white transition-colors duration-300 hover:bg-pine-900 md:px-12 md:py-20"
          >
            <h2 className="mx-auto max-w-4xl text-balance text-3xl font-bold uppercase leading-tight tracking-[0.08em] sm:text-4xl md:text-6xl">
              Tell us where you want bike parking
            </h2>
            <span className="btn-glass-dark mt-8">
              Open the form <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

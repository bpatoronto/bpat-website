import { useEffect, useRef, type ReactNode } from 'react'

type StaggerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
}

/** Fades direct children in one after another the first time the group enters view. */
export default function Stagger({ children, className = '', as: Tag = 'div' }: StaggerProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`x-stagger ${className}`}>
      {children}
    </Tag>
  )
}

export function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12m-5-5 5 5-5 5" />
    </svg>
  )
}

export const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeIzRvM1VL7rkrQ9ZaurMjTK3pBn1l3y99egzixBYhRsMswJQ/viewform?usp=preview'

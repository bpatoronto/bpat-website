import { LogoMark } from '../components/Logo'
import { socials } from '../data/socials'
import { useEffect } from 'react'

export type LinkItem = {
    label: string,
    href: string,
    path: string
}

/** Not in the shared socials, so the footer doesn't show it.
const github: LinkItem = {
    label: 'GitHub',
    href: 'https://github.com/RichardLi-1/bpat',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
} */

const request: LinkItem = {
    label: 'Request Bike Parking',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeIzRvM1VL7rkrQ9ZaurMjTK3pBn1l3y99egzixBYhRsMswJQ/viewform',
    path: "M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1v5h5M8 12h8M8 16h8M8 20h5"
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

const socialLinks: LinkItem[] = [...socials, request]

function Icon({ path }: { path: string }) {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d={path} />
        </svg>
    )
}

export default function FollowPage() {
    useEffect(() => {
        document.title = 'Follow Bike Parking Alliance of Toronto'
    })

    return (
        <main className="flex min-h-screen items-center justify-center bg-paper px-4 py-12">
            <div className="w-full max-w-sm rounded-[22px] bg-pine-950 p-8 text-center text-white shadow-[0_50px_90px_-40px_rgba(11,33,35,0.7)] md:p-10">
                <LogoMark className="mx-auto h-12 w-12" />
                <h1 className="mt-4 text-2xl font-semibold tracking-[-0.015em]">BPAT</h1>
                <p className="mt-2 leading-relaxed text-white/65">All our links.</p>

                {/*<div className="mt-6 flex justify-center gap-3">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine-950 transition-colors hover:bg-pine-100 ${focusRing}`}
                        >
                            <Icon path={link.path} />
                        </a>
                    ))}
                </div> */}

                <div className="mt-8 flex flex-col gap-3">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2.5 rounded-lg bg-white px-4 py-3.5 font-medium text-pine-950 transition-colors hover:bg-pine-100 ${focusRing}`}
                        >
                            <Icon path={link.path} />
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </main>
    )
}

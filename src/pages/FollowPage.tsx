import { LogoMark } from '../components/Logo'
import { socials } from '../data/socials'
import { FORM_URL } from '../components/home/Stagger'
import { Helmet } from "react-helmet-async"

export type LinkItem = {
    label: string,
    href: string,
    path: string
}


const request: LinkItem = {
    label: 'Request Bike Parking',
    href: FORM_URL,
    path: "M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1v5h5M8 12h8M8 16h8M8 20h5"
}

const email: LinkItem = {
    label: 'Email',
    href: 'mailto:bpat.toronto@gmail.com',
    path: "M3 5h18v14H3V5Zm0 1 9 7 9-7"
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

const socialLinks: LinkItem[] = [email, ...socials, request]

function Icon({ path }: { path: string }) {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d={path} />
        </svg>
    )
}

export default function FollowPage() {
    //useEffect(() => {
    //    document.title = 'Follow Bike Parking Alliance of Toronto'
    //})

    return (
        <>
            <Helmet>
                <title>Follow Bike Parking Alliance of Toronto</title>
                <meta name="description" content="Follow BPAT, the Bike Parking Alliance of Toronto, on Instagram, X and Bluesky, or request bike parking for a spot in Toronto." />
                <link rel="canonical" href="https://bpat.ca/follow" />
            </Helmet>
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
                        {socialLinks.map((link) => {
                            const isWebLink = link.href.startsWith('http')

                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={isWebLink ? '_blank' : undefined}
                                    rel={isWebLink ? 'noopener noreferrer' : undefined}
                                    className={`flex items-center justify-center gap-2.5 rounded-lg bg-white px-4 py-3.5 font-medium text-pine-950 transition-colors hover:bg-pine-100 ${focusRing}`}
                                >
                                    <Icon path={link.path} />
                                    {link.label}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}

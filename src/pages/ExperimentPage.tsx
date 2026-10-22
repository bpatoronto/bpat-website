import { Helmet } from 'react-helmet-async'
import XNav from '../components/home/XNav'
import XHero from '../components/home/XHero'
import XProblem from '../components/home/XProblem'
import XApproach from '../components/home/XApproach'
import XBikeSpace from '../components/home/XBikeSpace'
import XTeam from '../components/home/XTeam'
import XRequest from '../components/home/XRequest'
import { XOwners, XFAQ, XFooter } from '../components/home/XClosing'

/** Experimental homepage redesign, kept on its own route for side-by-side review. */
export default function ExperimentPage() {
  return (
    <div className="bg-paper">
      <Helmet>
        <title>BPAT – experimental homepage</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <XNav />
      <main>
        <XHero />
        <XProblem />
        <XApproach />
        <XOwners />
        <XBikeSpace />
        <XTeam />
        <XFAQ />
        <XRequest />
      </main>
      <XFooter />
      {window.location.hostname !== 'bpat.ca' && (
        <span className="fixed bottom-4 left-4 z-[1100] rounded-md bg-amber-100 px-2.5 py-1.5 text-xs font-medium text-amber-900 shadow-sm">
          Experimental layout
        </span>
      )}
    </div>
  )
}

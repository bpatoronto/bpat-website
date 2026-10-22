import Nav from '../components/Nav'
import Footer from '../components/Footer'
import XHero from '../components/home/XHero'
import XProblem from '../components/home/XProblem'
import XApproach from '../components/home/XApproach'
import XBikeSpace from '../components/home/XBikeSpace'
import XTeam from '../components/home/XTeam'
import XRequest from '../components/home/XRequest'
import { XOwners, XFAQ } from '../components/home/XClosing'

export default function HomePage() {
  return (
    <div className="bg-paper">
      <Nav />
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
      <Footer />
    </div>
  )
}

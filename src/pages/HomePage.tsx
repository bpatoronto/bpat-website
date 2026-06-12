import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Problem from '../components/Problem'
import Approach from '../components/Approach'
import Owners from '../components/Owners'
import MapTeaser from '../components/MapTeaser'
import GetInvolved from '../components/GetInvolved'
import Footer from '../components/Footer'
import DesignToggle from '../components/DesignToggle'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Approach />
        <Owners />
        <MapTeaser />
        <GetInvolved />
      </main>
      <Footer />
      <DesignToggle />
    </>
  )
}

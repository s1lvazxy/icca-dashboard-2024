import Hero from '@/components/Hero'
import WorldMap from '@/components/WorldMap'
import TopCities from '@/components/TopCities'
import PortugalHighlight from '@/components/PortugalHighlight'
import TopCountries from '@/components/TopCountries'
import GlobalContext from '@/components/GlobalContext'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#080C14] min-h-screen">
      <Hero />
      <WorldMap />
      <TopCities />
      <PortugalHighlight />
      <TopCountries />
      <GlobalContext />
      <Footer />
    </main>
  )
}

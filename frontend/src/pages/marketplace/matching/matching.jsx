import Header from './components/Header.jsx'
import PageHeader from './components/PageHeader.jsx'
import Proposals from './components/Proposals.jsx'
import Bids from './components/Bids.jsx'
import Visualization from './components/Visualization.jsx'
import Stats from './components/Stats.jsx'
import BidModal from './components/BidModal.jsx'

export default function MatchingEnginePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
      <Header />
      <main>
        <PageHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Proposals />
          <Bids />
        </div>
        <Visualization />
        <Stats />
        <BidModal />
      </main>
    </div>
  )
}



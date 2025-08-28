import Header from './components/Header.jsx'
import PageHeader from './components/PageHeader.jsx'
import Proposals from './components/Proposals.jsx'
import Bids from './components/Bids.jsx'
import Visualization from './components/Visualization.jsx'
import Stats from './components/Stats.jsx'
import BidModal from './components/BidModal.jsx'

export default function MatchingEnginePage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <Header />
        <main className="space-y-6">
          <div className="bg-white/90 backdrop-blur border border-emerald-100 rounded-2xl shadow-sm">
            <div className="p-6">
              <PageHeader />
            </div>
            <div className="border-t border-emerald-100 p-6">
              <Visualization />
            </div>
            <div className="border-t border-emerald-100 p-6">
              <Stats />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
              <Proposals />
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
              <Bids />
            </div>
          </div>
          <BidModal />
        </main>
      </div>
    </div>
  )
}



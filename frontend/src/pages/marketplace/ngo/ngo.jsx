import useNgoProfile from './hooks/useNgoProfile.js'
import HeaderBar from './components/HeaderBar.jsx'
import HeroSection from './components/HeroSection.jsx'
import TabsNav from './components/TabsNav.jsx'
import ImpactTimeline from './components/ImpactTimeline.jsx'
import DocumentsPanel from './components/DocumentsPanel.jsx'
import FinancialTransparency from './components/FinancialTransparency.jsx'
import CertificatesGrid from './components/CertificatesGrid.jsx'
import TestimonialsGrid from './components/TestimonialsGrid.jsx'
import NgoCard from './components/NgoCard.jsx'

export default function NgoDashboardPage() {
  const { activeTab, setActiveTab, selectedNgo, setSelectedNgo, list, header, hero, impactTimeline, documents, transparency, certificates, testimonials } = useNgoProfile()

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-screen">
      {selectedNgo && <HeaderBar header={header} onBack={() => setSelectedNgo(null)} />}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {!selectedNgo ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} onSelect={setSelectedNgo} />
            ))}
          </section>
        ) : (
          <>
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
              <HeroSection hero={hero} />
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
                <button onClick={() => setSelectedNgo(null)} className="px-4 py-2 text-sm rounded-lg border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50">Back to NGO List</button>
              </div>
            </div>
            {activeTab === 'impact' && (
              <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
                <ImpactTimeline items={impactTimeline} />
              </div>
            )}
            {activeTab === 'documents' && (
              <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
                <DocumentsPanel documents={documents} />
              </div>
            )}
            {activeTab === 'audits' && (
              <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
                <FinancialTransparency data={transparency} />
              </div>
            )}
            {activeTab === 'certificates' && (
              <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
                <CertificatesGrid items={certificates} />
              </div>
            )}
            {activeTab === 'testimonials' && (
              <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-6">
                <TestimonialsGrid items={testimonials} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}



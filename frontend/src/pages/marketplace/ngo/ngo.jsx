import useNgoProfile from './hooks/useNgoProfile.js'
import HeaderBar from './components/HeaderBar.jsx'
import HeroSection from './components/HeroSection.jsx'
import TabsNav from './components/TabsNav.jsx'
import ImpactTimeline from './components/ImpactTimeline.jsx'
import DocumentsPanel from './components/DocumentsPanel.jsx'
import FinancialTransparency from './components/FinancialTransparency.jsx'
import CertificatesGrid from './components/CertificatesGrid.jsx'
import TestimonialsGrid from './components/TestimonialsGrid.jsx'

export default function NgoDashboardPage() {
  const { activeTab, setActiveTab, header, hero, impactTimeline, documents, transparency, certificates, testimonials } = useNgoProfile()

  return (
    <div className="bg-[#f5f1eb] min-h-screen">
      <HeaderBar header={header} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <HeroSection hero={hero} />
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'impact' && <ImpactTimeline items={impactTimeline} />}
        {activeTab === 'documents' && <DocumentsPanel documents={documents} />}
        {activeTab === 'audits' && <FinancialTransparency data={transparency} />}
        {activeTab === 'certificates' && <CertificatesGrid items={certificates} />}
        {activeTab === 'testimonials' && <TestimonialsGrid items={testimonials} />}
      </main>
    </div>
  )
}



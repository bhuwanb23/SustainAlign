import Header from './components/Header.jsx'
import PageHeader from './components/PageHeader.jsx'
import { ProjectOverview, SdgAlignment, CostBenefit, NgoCredibility } from './components/AnalysisPanels.jsx'
import { DecisionFactors, AiConfidence, RiskAssessment } from './components/SidebarWidgets.jsx'
import useRationale from './hooks/useRationale.js'

export default function RecommendationRationalePage() {
  const { currentRationale, loading, error } = useRationale()

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <span className="text-red-800">Error loading rationale data: {error}</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <ProjectOverview rationale={currentRationale} loading={loading} />
            <div className="space-y-6">
              <SdgAlignment rationale={currentRationale} loading={loading} />
              <CostBenefit rationale={currentRationale} loading={loading} />
              <NgoCredibility rationale={currentRationale} loading={loading} />
            </div>
          </div>
          <div className="col-span-4">
            <DecisionFactors rationale={currentRationale} loading={loading} />
            <AiConfidence />
            <RiskAssessment />
          </div>
        </div>
      </main>
    </div>
  )
}



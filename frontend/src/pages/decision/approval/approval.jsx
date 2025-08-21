import Header from './components/Header.jsx'
import PageHeader from './components/PageHeader.jsx'
import { ProjectOverview, SdgAlignment, CostBenefit, NgoCredibility } from './components/AnalysisPanels.jsx'
import { DecisionFactors, AiConfidence, RiskAssessment } from './components/SidebarWidgets.jsx'

export default function ApprovalWorkflowPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <ProjectOverview />
            <div className="space-y-6">
              <SdgAlignment />
              <CostBenefit />
              <NgoCredibility />
            </div>
          </div>
          <div className="col-span-4">
            <DecisionFactors />
            <AiConfidence />
            <RiskAssessment />
          </div>
        </div>
      </main>
    </div>
  )
}



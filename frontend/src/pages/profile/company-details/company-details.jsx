import useCsrProfile from './hooks/useCsrProfile.js'
import ProgressRibbon from './components/ProgressRibbon.jsx'
import CompanyInfoCard from './components/CompanyInfoCard.jsx'
import CsrBudgetCard from './components/CsrBudgetCard.jsx'
import SectorPrioritiesCard from './components/SectorPrioritiesCard.jsx'
import EsgTargetsCard from './components/EsgTargetsCard.jsx'
import SubmitSection from './components/SubmitSection.jsx'
import AllocationPreview from './components/AllocationPreview.jsx'
import CelebrationModal from './components/CelebrationModal.jsx'

export default function CompanyDetailsPage() {
  const state = useCsrProfile()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 eco-pattern leaf-pattern">
      <ProgressRibbon />

      <div id="main-container" className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div id="form-section" className="lg:col-span-2 space-y-6">
            <CompanyInfoCard
              companyName={state.companyName}
              setCompanyName={state.setCompanyName}
              industry={state.industry}
              setIndustry={state.setIndustry}
            />

            <CsrBudgetCard totalBudget={state.totalBudget} setTotalBudget={state.setTotalBudget} />

            <SectorPrioritiesCard
              climatePercent={state.climatePercent}
              setClimatePercent={state.setClimatePercent}
              educationPercent={state.educationPercent}
              setEducationPercent={state.setEducationPercent}
              healthcarePercent={state.healthcarePercent}
              setHealthcarePercent={state.setHealthcarePercent}
            />

            <EsgTargetsCard
              targetYear={state.targetYear}
              setTargetYear={state.setTargetYear}
              reportingStandard={state.reportingStandard}
              setReportingStandard={state.setReportingStandard}
            />

            <SubmitSection onSubmit={state.openCelebration} />
          </div>

          <div id="sidebar-section" className="lg:col-span-1">
            <AllocationPreview
              totalBudget={state.totalBudget}
              climatePercent={state.climatePercent}
              educationPercent={state.educationPercent}
              healthcarePercent={state.healthcarePercent}
              climateAmount={state.climateAmount}
              educationAmount={state.educationAmount}
              healthcareAmount={state.healthcareAmount}
            />
          </div>
        </div>
      </div>

      <CelebrationModal open={state.isCelebrating} onClose={state.closeCelebration} />
    </div>
  )
}



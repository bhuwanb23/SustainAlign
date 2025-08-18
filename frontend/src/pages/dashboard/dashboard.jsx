import Header from './components/Header.jsx'
import QuickStats from './components/QuickStats.jsx'
import BudgetChart from './components/BudgetChart.jsx'
import EsgChart from './components/EsgChart.jsx'
import ActiveProjects from './components/ActiveProjects.jsx'
import QuickActions from './components/QuickActions.jsx'
import ComplianceAlerts from './components/ComplianceAlerts.jsx'
import useDashboardData from './hooks/useDashboardData.js'

export default function DashboardPage() {
  const { quickStats, esgScores, esgCategories, activeProjects, alerts, budgetAllocation, actions } = useDashboardData()

  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto">
        <QuickStats stats={quickStats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BudgetChart data={budgetAllocation} />
          <EsgChart categories={esgCategories} scores={esgScores} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveProjects projects={activeProjects} />
          </div>
          <div className="space-y-6">
            <QuickActions onNewProject={actions.addProject} onGenerateReport={actions.generateReport} onScheduleReview={actions.scheduleReview} />
            <ComplianceAlerts alerts={alerts} />
          </div>
        </div>
      </div>
    </>
  )
}



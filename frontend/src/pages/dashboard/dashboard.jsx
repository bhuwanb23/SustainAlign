import useDashboardData from './hooks/useDashboardData.js'
import DashboardTopBar from './components/DashboardTopBar.jsx'
import BudgetOverview from './components/BudgetOverview.jsx'
import AlignmentPanel from './components/AlignmentPanel.jsx'
import ActiveProjectsSnapshot from './components/ActiveProjectsSnapshot.jsx'
import QuickActionsPanel from './components/QuickActionsPanel.jsx'
import NotificationsFeed from './components/NotificationsFeed.jsx'
import ImpactSpotlight from './components/ImpactSpotlight.jsx'

export default function DashboardPage() {
  const { quickStats, esgScores, esgCategories, activeProjects, alerts, budgetAllocation, actions } = useDashboardData()

  const company = { name: 'EcoImpact Corp', fy: '24-25', tagline: 'Driving sustainable outcomes' }
  const budget = { total: 24000000, utilizedPct: 42, remaining: 13920000 }
  const sdgs = [
    { label: 'Climate Action', icon: '🌳' },
    { label: 'Quality Education', icon: '📘' },
    { label: 'Clean Water', icon: '💧' },
  ]
  const projects = activeProjects.map((p, i) => ({ id: i, title: p.title, ngo: 'NGO Partner', location: 'India', progress: 60 - i * 10, status: i===0?'on':i===1?'delay':'risk' }))
  const kpis = [
    { label: 'Students educated', value: '10,500' },
    { label: 'Water conserved', value: '5.2M L' },
    { label: 'CO₂ reduced', value: '1,200 t' },
  ]
  const feed = [
    { text: 'CSR spend must reach 2% by Q4.', type: 'critical', tag: 'Compliance' },
    { text: 'NGO Report due in 5 days.', type: 'warning', tag: 'Deadline' },
    { text: '3 projects match your climate action goals.', type: 'info', tag: 'AI' },
  ]
  const story = { image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=800&auto=format&fit=crop', title: '10,000 trees planted in Maharashtra', subtitle: '25% survival rate improvement over last year' }

  return (
    <div className="p-4">
      <DashboardTopBar company={company} />
      <div className="max-w-7xl mx-auto">
        <BudgetOverview budget={budget} />
        <AlignmentPanel esgScore={72} sdgs={sdgs} alignedPct={68} />
        <ActiveProjectsSnapshot projects={projects} kpis={kpis} />
        <QuickActionsPanel
          onFind={() => (window.location.href = '/discovery/search')}
          onReport={() => (window.location.href = '/reporting/generator')}
          onMonitor={() => (window.location.href = '/monitoring/impact')}
          onSettings={() => (window.location.href = '/settings/users')}
        />
        <NotificationsFeed items={feed} />
        <ImpactSpotlight story={story} />
      </div>
    </div>
  )
}



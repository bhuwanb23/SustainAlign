import AdminHeader from './components/AdminHeader.jsx'
import FinancialsSection from './components/FinancialsSection.jsx'
import EsgSdgSection from './components/EsgSdgSection.jsx'
import ActiveProjectsSnapshot from './components/ActiveProjectsSnapshot.jsx'
import ComplianceRiskSection from './components/ComplianceRiskSection.jsx'
import InsightsSection from './components/InsightsSection.jsx'
import QuickActionsPanel from './components/QuickActionsPanel.jsx'
import AdminFooter from './components/AdminFooter.jsx'

export default function DashboardPage() {
  const today = new Date().toLocaleDateString(undefined, { weekday:'long', year:'numeric', month:'long', day:'numeric' })
  const kpis = [
    { label: 'Total CSR Budget', value: '₹ 24,00,00,000' },
    { label: 'Budget Utilized', value: '42%', badge: '+3% MoM', badgeClass: 'bg-emerald-50 text-emerald-700' },
    { label: 'Active Projects', value: '24' },
    { label: 'Compliance Status', value: 'Amber', badgeClass: 'bg-yellow-50 text-yellow-700', badge: 'Due in 5d' },
    { label: 'Overall ESG Score', value: '72/100' },
  ]

  const allocationData = []
  const trendData = []
  const breakdown = [
    { project: 'Clean Water Initiative', allocated: 4500000, spent: 3200000 },
    { project: 'Education Access Program', allocated: 3200000, spent: 2100000 },
    { project: 'Renewable Energy Project', allocated: 7800000, spent: 7800000 },
  ]

  const esg = [70, 74, 72]
  const sdgHeatmap = [
    { label:'Climate Action', short:'13', score: 80 },
    { label:'Clean Water', short:'6', score: 76 },
    { label:'Quality Education', short:'4', score: 68 },
    { label:'Good Health', short:'3', score: 64 },
    { label:'No Poverty', short:'1', score: 58 },
  ]
  const comparison = { yours: 72, industry: 68 }

  const projects = [
    { id:'p1', title:'Clean Water Initiative', ngo:'AquaTrust', location:'Rajasthan', progress:78, status:'on' },
    { id:'p2', title:'Education Access Program', ngo:'EduCare', location:'Bihar', progress:46, status:'delay' },
    { id:'p3', title:'Renewable Energy Project', ngo:'SunRise', location:'Gujarat', progress:100, status:'on' },
  ]
  const impactKpis = [
    { label: 'Students educated', value: '10,500' },
    { label: 'Water conserved', value: '5.2M L' },
    { label: 'CO₂ reduced', value: '1,200 t' },
  ]

  const notifications = [
    'CSR spend must reach 2% by Q4.',
    'Project “Education Access Program” nearing budget threshold.',
    'Quarterly filing due in 5 days.',
  ]

  const suggestions = [
    'Allocate 10% of remaining budget to water conservation in drought-prone areas.',
    'Pilot 2 projects with verified high NGO credibility scores.',
  ]
  const topProjects = ['Rural Water ATMs', 'Solar Schools Phase II', 'Community Health Vans']
  const forecast = { water: '2.1M L', students: '8,200', co2: '350 t' }

  return (
    <div className="relative">
      {/* Ambient animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 sa-animated-bg opacity-70"></div>

      <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto space-y-6">
        {/* Hero header */}
        <div className="sa-fade-up [animation-delay:0ms]">
          <AdminHeader adminName="CSR Admin" dateString={today} kpis={kpis} />
        </div>

        {/* Quick toolbar */}
        <div
          className="sa-fade-up [animation-delay:60ms] rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur p-3 md:p-4 flex flex-col md:flex-row md:items-center gap-3"
        >
          <div className="flex-1 flex items-center gap-2">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search projects, NGOs, locations..."
                className="w-full rounded-xl border border-emerald-100/80 bg-white px-3 py-2 text-sm text-emerald-900 placeholder:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400">🔎</span>
            </div>
            <select
              className="rounded-xl border border-emerald-100/80 bg-white px-3 py-2 text-sm text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              defaultValue="q3"
              aria-label="Date range"
            >
              <option value="mtd">MTD</option>
              <option value="q3">Q3</option>
              <option value="ytd">YTD</option>
              <option value="12m">12M</option>
            </select>
          </div>
          <div className="flex items-center gap-2 md:justify-end">
            <button
              className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 border border-emerald-100 hover:bg-emerald-50"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
            <button
              className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:opacity-90 shadow-sm"
              onClick={() => window.alert('Exporting dashboard...')}
            >
              Export
            </button>
            <button
              className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 border border-emerald-100 hover:bg-emerald-50"
              onClick={() => (window.location.href = '/discovery/cards')}
            >
              + New Project
            </button>
          </div>
        </div>

        {/* Core sections with staggered entrance */}
        <div className="sa-fade-up [animation-delay:120ms]">
          <FinancialsSection allocationData={allocationData} trendData={trendData} breakdown={breakdown} />
        </div>
        <div className="sa-fade-up [animation-delay:180ms]">
          <EsgSdgSection esg={esg} sdgHeatmap={sdgHeatmap} comparison={comparison} />
        </div>
        <div className="sa-fade-up [animation-delay:240ms]">
          <ActiveProjectsSnapshot projects={projects} kpis={impactKpis} />
        </div>
        <div className="sa-fade-up [animation-delay:300ms]">
          <ComplianceRiskSection notifications={notifications} riskLevel="Medium" />
        </div>
        <div className="sa-fade-up [animation-delay:360ms]">
          <InsightsSection suggestions={suggestions} topProjects={topProjects} forecast={forecast} />
        </div>

        {/* Quick actions panel */}
        <div className="sa-fade-up [animation-delay:420ms]">
          <QuickActionsPanel
            onFind={() => (window.location.href = '/discovery/search')}
            onReport={() => (window.location.href = '/reporting/generator')}
            onMonitor={() => (window.location.href = '/monitoring/impact')}
            onSettings={() => (window.location.href = '/settings/users')}
          />
        </div>

        {/* Footer */}
        <div className="sa-fade-up [animation-delay:480ms]">
          <AdminFooter compliancePct={78} />
        </div>
      </div>
    </div>
  )
}



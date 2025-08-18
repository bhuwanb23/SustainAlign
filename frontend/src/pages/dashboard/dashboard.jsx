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
    <div className="p-4 max-w-7xl mx-auto">
      <AdminHeader adminName="CSR Admin" dateString={today} kpis={kpis} />
      <FinancialsSection allocationData={allocationData} trendData={trendData} breakdown={breakdown} />
      <EsgSdgSection esg={esg} sdgHeatmap={sdgHeatmap} comparison={comparison} />
      <ActiveProjectsSnapshot projects={projects} kpis={impactKpis} />
      <ComplianceRiskSection notifications={notifications} riskLevel="Medium" />
      <InsightsSection suggestions={suggestions} topProjects={topProjects} forecast={forecast} />
      <QuickActionsPanel
        onFind={() => (window.location.href = '/discovery/search')}
        onReport={() => (window.location.href = '/reporting/generator')}
        onMonitor={() => (window.location.href = '/monitoring/impact')}
        onSettings={() => (window.location.href = '/settings/users')}
      />
      <AdminFooter compliancePct={78} />
    </div>
  )
}



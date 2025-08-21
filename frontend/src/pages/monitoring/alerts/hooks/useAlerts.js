import { useMemo, useState } from 'react'

export default function useAlerts() {
  const [filterRisk, setFilterRisk] = useState('All Risk Levels')
  const [filterProject, setFilterProject] = useState('All Projects')
  const [sort, setSort] = useState('Sort by Urgency')
  const [lastUpdated, setLastUpdated] = useState('2 mins ago')
  const [riskPercent, setRiskPercent] = useState(72)

  const allProjects = ['All Projects', 'Solar Initiative', 'Carbon Offset Program', 'Waste Reduction', 'Green Energy Transition', 'Sustainability Reporting', 'Community Outreach Program']

  const allAlerts = useMemo(
    () => [
      {
        id: 'c1',
        severity: 'critical',
        title: 'Compliance Violation Detected',
        project: 'Solar Initiative',
        minutesAgo: 2,
        description: 'Environmental permit deadline missed. Immediate regulatory review required to avoid project shutdown.',
        icon: '⚠️',
        actionPrimary: 'Escalate',
      },
      {
        id: 'm1',
        severity: 'medium',
        title: 'Budget Overrun Alert',
        project: 'Carbon Offset Program',
        minutesAgo: 15,
        description: 'Project spending at 85% of allocated budget with 60% completion. Cost optimization review needed.',
        icon: '💲',
        actionPrimary: 'Resolve',
      },
      {
        id: 'l1',
        severity: 'low',
        title: 'Milestone Delay Warning',
        project: 'Waste Reduction Initiative',
        minutesAgo: 60,
        description: 'Phase 2 deliverable scheduled for next week shows potential 3-day delay. Team coordination recommended.',
        icon: '⏰',
        actionPrimary: 'Resolve',
      },
      {
        id: 'c2',
        severity: 'critical',
        title: 'Critical Budget Breach',
        project: 'Green Energy Transition',
        minutesAgo: 5,
        description: 'Project exceeded approved budget by 15%. Immediate financial review and stakeholder approval required.',
        icon: '💲',
        actionPrimary: 'Escalate',
      },
      {
        id: 'm2',
        severity: 'medium',
        title: 'Compliance Review Due',
        project: 'Sustainability Reporting',
        minutesAgo: 30,
        description: 'Quarterly ESG compliance review due in 5 days. Documentation and stakeholder approvals pending.',
        icon: '⚠️',
        actionPrimary: 'Resolve',
      },
      {
        id: 'l2',
        severity: 'low',
        title: 'Resource Allocation Notice',
        project: 'Community Outreach Program',
        minutesAgo: 120,
        description: 'Additional team members may be needed for upcoming community engagement events. Planning review suggested.',
        icon: '⏰',
        actionPrimary: 'Resolve',
      },
    ],
    []
  )

  const filtered = useMemo(() => {
    let list = allAlerts
    if (filterRisk !== 'All Risk Levels') {
      const map = { Critical: 'critical', Medium: 'medium', Low: 'low' }
      list = list.filter((a) => a.severity === map[filterRisk] || a.severity === filterRisk)
    }
    if (filterProject !== 'All Projects') list = list.filter((a) => a.project === filterProject)
    if (sort === 'Most Recent') list = [...list].sort((a, b) => a.minutesAgo - b.minutesAgo)
    if (sort === 'Oldest First') list = [...list].sort((a, b) => b.minutesAgo - a.minutesAgo)
    if (sort === 'Sort by Urgency') {
      const weight = { critical: 0, medium: 1, low: 2 }
      list = [...list].sort((a, b) => weight[a.severity] - weight[b.severity] || a.minutesAgo - b.minutesAgo)
    }
    return list
  }, [allAlerts, filterRisk, filterProject, sort])

  const onRefresh = () => {
    setLastUpdated('just now')
    setRiskPercent((v) => Math.max(10, Math.min(95, v + (Math.random() * 10 - 5))))
  }

  return {
    filterRisk,
    setFilterRisk,
    filterProject,
    setFilterProject,
    sort,
    setSort,
    lastUpdated,
    riskPercent,
    alerts: filtered,
    totalCount: allAlerts.length,
    allProjects,
    onRefresh,
  }
}



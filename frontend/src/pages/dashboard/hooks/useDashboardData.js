import { useCallback, useMemo, useState } from 'react'

export default function useDashboardData() {
  const [quickStats, setQuickStats] = useState([
    { label: 'Total CSR Budget', value: '$2.4M', trend: '+12% from last year', icon: 'dollar-sign', color: 'blue' },
    { label: 'ESG Score', value: '87/100', trend: 'Excellent rating', icon: 'leaf', color: 'green' },
    { label: 'Active Projects', value: '24', trend: '6 pending approval', icon: 'diagram-project', color: 'orange' },
    { label: 'SDG Impact', value: '12', trend: 'Goals addressed', icon: 'globe', color: 'purple' },
  ])

  const [esgScores, setEsgScores] = useState([85, 90, 87])
  const esgCategories = ['Environmental', 'Social', 'Governance']

  const [activeProjects, setActiveProjects] = useState([
    { title: 'Clean Water Initiative', sdg: 'SDG 6: Clean Water & Sanitation', amount: '$450K', status: 'On track', color: 'green', icon: 'water' },
    { title: 'Education Access Program', sdg: 'SDG 4: Quality Education', amount: '$320K', status: 'Needs review', color: 'blue', icon: 'graduation-cap' },
    { title: 'Renewable Energy Project', sdg: 'SDG 7: Affordable Clean Energy', amount: '$780K', status: 'Completed', color: 'yellow', icon: 'solar-panel' },
  ])

  const [alerts, setAlerts] = useState([
    { title: 'Annual Report Due', subtitle: 'Due in 5 days', color: 'red', icon: 'triangle-exclamation' },
    { title: 'Budget Review', subtitle: 'Scheduled for next week', color: 'yellow', icon: 'clock' },
  ])

  const budgetAllocation = useMemo(
    () => [
      { name: 'Environment', y: 35 },
      { name: 'Education', y: 25 },
      { name: 'Healthcare', y: 20 },
      { name: 'Community', y: 20 },
    ],
    [],
  )

  const addProject = useCallback(() => {
    const newProject = {
      title: 'New Impact Initiative',
      sdg: 'SDG 13: Climate Action',
      amount: '$150K',
      status: 'Proposed',
      color: 'green',
      icon: 'leaf',
    }
    setActiveProjects((prev) => [newProject, ...prev])
    setQuickStats((prev) => prev.map((s) => (s.label === 'Active Projects' ? { ...s, value: String(Number(s.value) + 1) } : s)))
    alert('Project created')
  }, [])

  const generateReport = useCallback(() => {
    alert('Generating report...')
  }, [])

  const scheduleReview = useCallback(() => {
    setAlerts((prev) => [{ title: 'Review Scheduled', subtitle: 'Next Monday 10:00 AM', color: 'yellow', icon: 'calendar' }, ...prev])
    alert('Review scheduled')
  }, [])

  return {
    quickStats,
    esgScores,
    esgCategories,
    activeProjects,
    alerts,
    budgetAllocation,
    actions: { addProject, generateReport, scheduleReview },
  }
}



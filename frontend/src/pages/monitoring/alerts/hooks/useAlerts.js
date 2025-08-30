import { useMemo, useState, useEffect } from 'react'
import { getCorporateRiskAnalysis } from '../../../../lib/riskApiNew.js'

export default function useAlerts() {
  const [filterRisk, setFilterRisk] = useState('All Risk Levels')
  const [filterProject, setFilterProject] = useState('All Projects')
  const [sort, setSort] = useState('Sort by Urgency')
  const [lastUpdated, setLastUpdated] = useState('2 mins ago')
  const [riskPercent, setRiskPercent] = useState(72)
  const [showRiskAlerts, setShowRiskAlerts] = useState(true)
  const [corporateData, setCorporateData] = useState({ companies: [] })

  const allProjects = ['All Projects', 'Solar Initiative', 'Carbon Offset Program', 'Waste Reduction', 'Green Energy Transition', 'Sustainability Reporting', 'Community Outreach Program']

  // Load corporate risk data for risk-based alerts
  useEffect(() => {
    const loadCorporateRiskData = async () => {
      try {
        const data = await getCorporateRiskAnalysis()
        setCorporateData(data)
      } catch (err) {
        console.error('Error loading corporate risk data:', err)
      }
    }

    loadCorporateRiskData()
  }, [])

  // Generate risk-based alerts from corporate projects
  const riskAlerts = useMemo(() => {
    const alerts = []
    
    corporateData.companies.forEach(company => {
      const projects = company.projects || []
      
      projects.forEach(project => {
        const riskScore = project.risk_score || 0
        const progress = project.progress_percentage || 0
        const budget = project.budget || 0
        const spent = project.spent_amount || 0
        
        // Critical risk alerts
        if (riskScore >= 80) {
          alerts.push({
            id: `risk-critical-${company.company_id}-${project.project_id}`,
            severity: 'critical',
            title: 'Critical Risk Level Detected',
            project: project.project_title || 'Unknown Project',
            minutesAgo: Math.floor(Math.random() * 60) + 1,
            description: `Project "${project.project_title}" has a critical risk score of ${riskScore}%. Immediate intervention required to mitigate risks.`,
            icon: '🚨',
            actionPrimary: 'Escalate',
            source: 'risk-analysis',
            company: company.company_name,
            riskScore
          })
        }
        
        // Budget overrun alerts
        if (spent > budget * 0.9 && progress < 80) {
          alerts.push({
            id: `risk-budget-${company.company_id}-${project.project_id}`,
            severity: 'critical',
            title: 'Budget Overrun Alert',
            project: project.project_title || 'Unknown Project',
            minutesAgo: Math.floor(Math.random() * 120) + 1,
            description: `Project "${project.project_title}" has spent ${((spent/budget)*100).toFixed(1)}% of budget with only ${progress}% completion.`,
            icon: '💲',
            actionPrimary: 'Review',
            source: 'risk-analysis',
            company: company.company_name,
            riskScore
          })
        }
        
        // Progress delay alerts
        if (progress < 50 && riskScore > 60) {
          alerts.push({
            id: `risk-progress-${company.company_id}-${project.project_id}`,
            severity: 'medium',
            title: 'Progress Delay Warning',
            project: project.project_title || 'Unknown Project',
            minutesAgo: Math.floor(Math.random() * 180) + 1,
            description: `Project "${project.project_title}" is behind schedule with ${progress}% completion and ${riskScore}% risk score.`,
            icon: '⏰',
            actionPrimary: 'Resolve',
            source: 'risk-analysis',
            company: company.company_name,
            riskScore
          })
        }
        
        // Medium risk alerts
        if (riskScore >= 60 && riskScore < 80) {
          alerts.push({
            id: `risk-medium-${company.company_id}-${project.project_id}`,
            severity: 'medium',
            title: 'Elevated Risk Level',
            project: project.project_title || 'Unknown Project',
            minutesAgo: Math.floor(Math.random() * 240) + 1,
            description: `Project "${project.project_title}" has an elevated risk score of ${riskScore}%. Monitoring and intervention recommended.`,
            icon: '⚠️',
            actionPrimary: 'Monitor',
            source: 'risk-analysis',
            company: company.company_name,
            riskScore
          })
        }
        
        // Low risk alerts for high-value projects
        if (riskScore >= 40 && riskScore < 60 && budget > 1000000) {
          alerts.push({
            id: `risk-low-${company.company_id}-${project.project_id}`,
            severity: 'low',
            title: 'Risk Monitoring Required',
            project: project.project_title || 'Unknown Project',
            minutesAgo: Math.floor(Math.random() * 360) + 1,
            description: `High-value project "${project.project_title}" (₹${(budget/100000).toFixed(1)}L) has moderate risk score of ${riskScore}%.`,
            icon: '📊',
            actionPrimary: 'Review',
            source: 'risk-analysis',
            company: company.company_name,
            riskScore
          })
        }
      })
    })
    
    return alerts.sort((a, b) => {
      const severityOrder = { critical: 0, medium: 1, low: 2 }
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity]
      if (severityDiff !== 0) return severityDiff
      return a.minutesAgo - b.minutesAgo
    })
  }, [corporateData.companies])

  // Calculate overall risk score
  const overallRiskScore = useMemo(() => {
    if (corporateData.companies.length === 0) return 0
    
    const allProjects = corporateData.companies.flatMap(company => company.projects || [])
    if (allProjects.length === 0) return 0
    
    const totalRiskScore = allProjects.reduce((sum, project) => {
      return sum + (project.risk_score || 0)
    }, 0)
    
    return Math.round(totalRiskScore / allProjects.length)
  }, [corporateData.companies])

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
        source: 'operational'
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
        source: 'operational'
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
        source: 'operational'
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
        source: 'operational'
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
        source: 'operational'
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
        source: 'operational'
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
    riskAlerts,
    overallRiskScore,
    showRiskAlerts,
    setShowRiskAlerts
  }
}



import { useMemo, useState, useEffect } from 'react'
import { getCorporateRiskAnalysis, getNGORiskAssessments, getNGORiskDetail } from '../../../../lib/riskApiNew.js'

export default function useRiskScoring() {
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState('All')
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Corporate risk analysis data
  const [corporateData, setCorporateData] = useState({
    companies: [],
    summary: { total_projects: 0, total_companies: 0, high_risk: 0, medium_risk: 0, low_risk: 0 },
    recent_unusual_activities: [],
    daily_analysis: {}
  })
  
  // NGO risk assessments data
  const [ngoData, setNgoData] = useState({
    ngos: [],
    metrics: { total: 0, low: 0, medium: 0, high: 0 }
  })
  
  // Selected company details
  const [selectedCompany, setSelectedCompany] = useState(null)

  // Load corporate risk analysis
  useEffect(() => {
    const loadCorporateRiskAnalysis = async () => {
      try {
        setLoading(true)
        const data = await getCorporateRiskAnalysis()
        setCorporateData(data)
        
        // Set first company as selected by default
        if (data.companies.length > 0 && !selectedCompanyId) {
          setSelectedCompanyId(data.companies[0].company_id)
          setSelectedCompany(data.companies[0])
        }
      } catch (err) {
        console.error('Error loading corporate risk analysis:', err)
        setError('Failed to load risk analysis data')
      } finally {
        setLoading(false)
      }
    }

    loadCorporateRiskAnalysis()
  }, [])

  // Load NGO risk assessments
  useEffect(() => {
    const loadNGORiskAssessments = async () => {
      try {
        const filters = {}
        if (query) filters.query = query
        if (riskFilter !== 'All') filters.risk = riskFilter
        
        const data = await getNGORiskAssessments(filters)
        setNgoData(data)
      } catch (err) {
        console.error('Error loading NGO risk assessments:', err)
        // Don't set error here as it's secondary data
      }
    }

    loadNGORiskAssessments()
  }, [query, riskFilter])

  // Update selected company when companyId changes
  useEffect(() => {
    if (selectedCompanyId && corporateData.companies.length > 0) {
      const company = corporateData.companies.find(c => c.company_id === selectedCompanyId)
      setSelectedCompany(company || null)
    }
  }, [selectedCompanyId, corporateData.companies])

  // Filter companies based on query and risk filter
  const filteredCompanies = useMemo(() => {
    return corporateData.companies.filter(company => {
      const matchesQuery = !query || company.company_name.toLowerCase().includes(query.toLowerCase())
      const matchesRisk = riskFilter === 'All' || company.risk_level === riskFilter
      return matchesQuery && matchesRisk
    })
  }, [corporateData.companies, query, riskFilter])

  // Generate risk alerts based on project risk scores
  const riskAlerts = useMemo(() => {
    const alerts = []
    
    // Process all companies and their projects
    corporateData.companies.forEach(company => {
      const projects = company.projects || []
      
      projects.forEach(project => {
        const riskScore = project.risk_score || 0
        const progress = project.progress_percentage || 0
        const budget = project.budget || 0
        const spent = project.spent_amount || 0
        
        // Critical alerts
        if (riskScore >= 80) {
          alerts.push({
            id: `critical-${company.company_id}-${project.project_id}`,
            severity: 'critical',
            title: 'Critical Risk Level Detected',
            project: project.project_title || 'Unknown Project',
            company: company.company_name,
            minutesAgo: Math.floor(Math.random() * 60) + 1,
            description: `Project "${project.project_title}" has a critical risk score of ${riskScore}%. Immediate intervention required to mitigate risks.`,
            icon: '🚨',
            actionPrimary: 'Escalate',
            riskScore,
            projectId: project.project_id,
            companyId: company.company_id
          })
        }
        
        // Budget overrun alerts
        if (spent > budget * 0.9 && progress < 80) {
          alerts.push({
            id: `budget-${company.company_id}-${project.project_id}`,
            severity: 'critical',
            title: 'Budget Overrun Alert',
            project: project.project_title || 'Unknown Project',
            company: company.company_name,
            minutesAgo: Math.floor(Math.random() * 120) + 1,
            description: `Project "${project.project_title}" has spent ${((spent/budget)*100).toFixed(1)}% of budget with only ${progress}% completion.`,
            icon: '💲',
            actionPrimary: 'Review',
            riskScore,
            projectId: project.project_id,
            companyId: company.company_id
          })
        }
        
        // Progress delay alerts
        if (progress < 50 && riskScore > 60) {
          alerts.push({
            id: `progress-${company.company_id}-${project.project_id}`,
            severity: 'medium',
            title: 'Progress Delay Warning',
            project: project.project_title || 'Unknown Project',
            company: company.company_name,
            minutesAgo: Math.floor(Math.random() * 180) + 1,
            description: `Project "${project.project_title}" is behind schedule with ${progress}% completion and ${riskScore}% risk score.`,
            icon: '⏰',
            actionPrimary: 'Resolve',
            riskScore,
            projectId: project.project_id,
            companyId: company.company_id
          })
        }
        
        // Medium risk alerts
        if (riskScore >= 60 && riskScore < 80) {
          alerts.push({
            id: `medium-${company.company_id}-${project.project_id}`,
            severity: 'medium',
            title: 'Elevated Risk Level',
            project: project.project_title || 'Unknown Project',
            company: company.company_name,
            minutesAgo: Math.floor(Math.random() * 240) + 1,
            description: `Project "${project.project_title}" has an elevated risk score of ${riskScore}%. Monitoring and intervention recommended.`,
            icon: '⚠️',
            actionPrimary: 'Monitor',
            riskScore,
            projectId: project.project_id,
            companyId: company.company_id
          })
        }
        
        // Low risk alerts for high-value projects
        if (riskScore >= 40 && riskScore < 60 && budget > 1000000) {
          alerts.push({
            id: `low-${company.company_id}-${project.project_id}`,
            severity: 'low',
            title: 'Risk Monitoring Required',
            project: project.project_title || 'Unknown Project',
            company: company.company_name,
            minutesAgo: Math.floor(Math.random() * 360) + 1,
            description: `High-value project "${project.project_title}" (₹${(budget/100000).toFixed(1)}L) has moderate risk score of ${riskScore}%.`,
            icon: '📊',
            actionPrimary: 'Review',
            riskScore,
            projectId: project.project_id,
            companyId: company.company_id
          })
        }
      })
    })
    
    // Sort by severity and recency
    return alerts.sort((a, b) => {
      const severityOrder = { critical: 0, medium: 1, low: 2 }
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity]
      if (severityDiff !== 0) return severityDiff
      return a.minutesAgo - b.minutesAgo
    })
  }, [corporateData.companies])

  // Calculate overall risk score for the system
  const overallRiskScore = useMemo(() => {
    if (corporateData.companies.length === 0) return 0
    
    const allProjects = corporateData.companies.flatMap(company => company.projects || [])
    if (allProjects.length === 0) return 0
    
    const totalRiskScore = allProjects.reduce((sum, project) => {
      return sum + (project.risk_score || 0)
    }, 0)
    
    return Math.round(totalRiskScore / allProjects.length)
  }, [corporateData.companies])

  // Get risk trend data for charts
  const riskTrendData = useMemo(() => {
    if (!selectedCompany) return null
    
    const projects = selectedCompany.projects || []
    const riskLevels = projects.map(p => p.risk_level)
    
    return {
      categories: ['Low', 'Medium', 'High'],
      data: [
        riskLevels.filter(level => level === 'Low').length,
        riskLevels.filter(level => level === 'Medium').length,
        riskLevels.filter(level => level === 'High').length
      ]
    }
  }, [selectedCompany])

  // Get unusual activities for selected company
  const unusualActivities = useMemo(() => {
    if (!selectedCompany) return []
    return selectedCompany.unusual_activities || []
  }, [selectedCompany])

  // Get daily metrics for selected company
  const dailyMetrics = useMemo(() => {
    if (!selectedCompany) return {}
    return selectedCompany.daily_metrics || {}
  }, [selectedCompany])

  // Get project risk distribution
  const projectRiskDistribution = useMemo(() => {
    if (!selectedCompany) return []
    
    const projects = selectedCompany.projects || []
    const distribution = {
      'Low Risk': 0,
      'Medium Risk': 0,
      'High Risk': 0
    }
    
    projects.forEach(project => {
      if (project.risk_level === 'Low') distribution['Low Risk']++
      else if (project.risk_level === 'Medium') distribution['Medium Risk']++
      else distribution['High Risk']++
    })
    
    return Object.entries(distribution).map(([label, value]) => ({ label, value }))
  }, [selectedCompany])

  return {
    // State
    loading,
    error,
    query,
    setQuery,
    riskFilter,
    setRiskFilter,
    
    // Corporate risk analysis
    companies: filteredCompanies,
    selectedCompany,
    setSelectedCompanyId,
    corporateSummary: corporateData.summary,
    recentUnusualActivities: corporateData.recent_unusual_activities,
    dailyAnalysis: corporateData.daily_analysis,
    
    // NGO risk assessments
    ngos: ngoData.ngos,
    ngoMetrics: ngoData.metrics,
    
    // Computed data
    riskTrendData,
    unusualActivities,
    dailyMetrics,
    projectRiskDistribution,
    riskAlerts,
    overallRiskScore,
    
    // Helper functions
    refreshData: () => {
      setLoading(true)
      // Reload data
      window.location.reload()
    }
  }
}



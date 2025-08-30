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
    
    // Helper functions
    refreshData: () => {
      setLoading(true)
      // Reload data
      window.location.reload()
    }
  }
}



import { useMemo, useRef, useState, useEffect } from 'react'
import { createReportJob, getReportJobs } from '../../../../lib/projectApi.js'
import { getTrackerProjects, getProjects } from '../../../../lib/projectApi.js'
import { getCorporateRiskAnalysis } from '../../../../lib/riskApiNew.js'

export default function useReportGenerator() {
  const [metrics, setMetrics] = useState({
    carbonFootprint: true,
    waterUsage: true,
    wasteManagement: true,
    energyEfficiency: true,
    socialImpact: true,
    governanceScore: true,
    financialPerformance: true,
    riskAssessment: true,
    projectProgress: true,
    stakeholderEngagement: true,
    complianceStatus: true,
    innovationMetrics: true
  })
  const [period, setPeriod] = useState('Q4 2024')
  const [reportType, setReportType] = useState('Comprehensive ESG Report')
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('2 mins ago')
  
  // New state for backend integration
  const [reportJobs, setReportJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentJob, setCurrentJob] = useState(null)
  
  // Data sources for comprehensive reports
  const [projectData, setProjectData] = useState([])
  const [riskData, setRiskData] = useState({})
  const [impactData, setImpactData] = useState({})

  const timerRef = useRef(null)

  // Load existing report jobs and data sources on mount
  useEffect(() => {
    loadReportJobs()
    loadDataSources()
  }, [])

  const loadDataSources = async () => {
    try {
      // Load project data from tracker and approved projects
      const [trackerProjects, approvedProjects, publishedProjects] = await Promise.all([
        getTrackerProjects(),
        getProjects({ status: 'funded' }),
        getProjects({ status: 'published' })
      ])
      
      const allProjects = [
        ...(Array.isArray(trackerProjects) ? trackerProjects : []),
        ...(approvedProjects?.projects || approvedProjects || []),
        ...(publishedProjects?.projects || publishedProjects || [])
      ]
      
      setProjectData(allProjects)
      
      // Load risk analysis data
      const riskAnalysis = await getCorporateRiskAnalysis()
      setRiskData(riskAnalysis)
      
      // Generate impact data from projects
      const impactMetrics = generateImpactMetrics(allProjects)
      setImpactData(impactMetrics)
      
    } catch (err) {
      console.error('Failed to load data sources:', err)
      // Don't set error here as it's not critical for basic functionality
    }
  }

  const generateImpactMetrics = (projects) => {
    if (!projects || projects.length === 0) return {}
    
    const totalProjects = projects.length
    const activeProjects = projects.filter(p => p.status === 'on-track' || p.status === 'funded' || p.status === 'published').length
    const completedProjects = projects.filter(p => p.status === 'completed').length
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0)
    const averageProgress = projects.reduce((sum, p) => sum + (p.progressPct || 0), 0) / totalProjects
    
    // Calculate impact scores
    const environmentalImpact = projects.reduce((sum, p) => {
      const impact = p.impact_score || 0
      return sum + (impact * (p.progressPct || 0) / 100)
    }, 0) / totalProjects
    
    const socialImpact = projects.filter(p => p.sdg_focus && p.sdg_focus.includes('social')).length / totalProjects * 100
    
    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalBudget,
      averageProgress,
      environmentalImpact,
      socialImpact,
      completionRate: (completedProjects / totalProjects) * 100
    }
  }

  const loadReportJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const jobs = await getReportJobs()
      setReportJobs(jobs)
    } catch (err) {
      console.error('Failed to load report jobs:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleMetric = (key) => setMetrics((m) => ({ ...m, [key]: !m[key] }))
  const selectPeriod = (p) => setPeriod(p)
  const selectReportType = (t) => setReportType(t)

  const generate = async () => {
    if (isGenerating) return
    
    try {
      setIsGenerating(true)
      setError(null)
      
      // Prepare comprehensive report data
      const reportData = {
        period: period,
        report_type: reportType,
        metrics: metrics,
        project_data: projectData,
        risk_data: riskData,
        impact_data: impactData,
        company_id: null // Will be set from user context in production
      }
      
      console.log('📤 Generating comprehensive report with data:', reportData)
      
      // Create report job in backend
      const newJob = await createReportJob(reportData)
      setCurrentJob(newJob)
      
      // Simulate generation process with more realistic timing
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsGenerating(false)
        setLastUpdated('just now')
        
        // Refresh the jobs list
        loadReportJobs()
      }, 3000) // Increased to 3 seconds for more realistic feel
      
    } catch (err) {
      console.error('Failed to generate report:', err)
      setError(err.message)
      setIsGenerating(false)
    }
  }

  const periodOptions = useMemo(() => [
    'Q4 2024', 
    'Q3 2024', 
    'Q2 2024', 
    'Q1 2024',
    'Annual 2024', 
    'Annual 2023',
    'Custom Range'
  ], [])
  
  const reportTypes = useMemo(
    () => [
      { 
        key: 'Comprehensive ESG Report', 
        color: 'green', 
        icon: '📊', 
        border: 'border-green-200',
        description: 'Complete ESG performance analysis with all metrics'
      },
      { 
        key: 'CSR Compliance Report', 
        color: 'blue', 
        icon: '🛡️', 
        border: 'border-blue-200',
        description: 'Corporate social responsibility compliance documentation'
      },
      { 
        key: 'ESG Progress Report', 
        color: 'purple', 
        icon: '📈', 
        border: 'border-purple-200',
        description: 'Environmental, social, and governance progress tracking'
      },
      { 
        key: 'SDG Impact Report', 
        color: 'orange', 
        icon: '🌐', 
        border: 'border-orange-200',
        description: 'Sustainable Development Goals alignment and impact'
      },
      { 
        key: 'Risk Assessment Report', 
        color: 'red', 
        icon: '⚠️', 
        border: 'border-red-200',
        description: 'Comprehensive risk analysis and mitigation strategies'
      },
      { 
        key: 'Financial Sustainability Report', 
        color: 'indigo', 
        icon: '💰', 
        border: 'border-indigo-200',
        description: 'Financial performance with sustainability metrics'
      },
      { 
        key: 'Stakeholder Engagement Report', 
        color: 'pink', 
        icon: '🤝', 
        border: 'border-pink-200',
        description: 'Stakeholder communication and engagement activities'
      },
      { 
        key: 'Innovation & Technology Report', 
        color: 'cyan', 
        icon: '🚀', 
        border: 'border-cyan-200',
        description: 'Innovation initiatives and technology adoption'
      }
    ],
    []
  )

  // Generate comprehensive report content
  const generateReportContent = () => {
    if (!projectData.length && !riskData.companies) {
      return {
        executiveSummary: "No data available for report generation.",
        keyMetrics: {},
        sections: []
      }
    }

    const totalProjects = projectData.length
    const activeProjects = projectData.filter(p => p.status === 'on-track' || p.status === 'funded' || p.status === 'published').length
    const totalBudget = projectData.reduce((sum, p) => sum + (p.budget || 0), 0)
    const averageRiskScore = riskData.companies ? 
      riskData.companies.reduce((sum, c) => sum + (c.risk_score || 0), 0) / riskData.companies.length : 0

    return {
      executiveSummary: `Our organization demonstrates strong commitment to sustainability with ${totalProjects} active projects and ₹${(totalBudget/1000000).toFixed(1)}M in total investment. We've achieved significant progress in environmental impact reduction and stakeholder engagement.`,
      keyMetrics: {
        totalProjects,
        activeProjects,
        totalBudget: (totalBudget/1000000).toFixed(1),
        averageRiskScore: Math.round(averageRiskScore),
        completionRate: impactData.completionRate || 0,
        environmentalImpact: Math.round(impactData.environmentalImpact || 0)
      },
      sections: [
        {
          title: "Environmental Performance",
          content: `Environmental initiatives have resulted in significant carbon footprint reduction and improved energy efficiency across all operations.`,
          metrics: {
            carbonReduction: "23%",
            energyEfficiency: "87%",
            wasteReduction: "45%",
            waterConservation: "18%"
          }
        },
        {
          title: "Social Impact",
          content: `Our social responsibility programs have positively impacted communities through education, healthcare, and economic development initiatives.`,
          metrics: {
            communityProjects: activeProjects,
            stakeholderEngagement: "92%",
            employeeSatisfaction: "4.2/5",
            diversityScore: "78%"
          }
        },
        {
          title: "Governance & Compliance",
          content: `Strong governance frameworks ensure transparency, ethical practices, and regulatory compliance across all business operations.`,
          metrics: {
            complianceRate: "96%",
            boardDiversity: "40%",
            ethicalScore: "4.5/5",
            transparencyIndex: "89%"
          }
        },
        {
          title: "Financial Performance",
          content: `Sustainable business practices have contributed to strong financial performance while maintaining long-term value creation.`,
          metrics: {
            revenueGrowth: "12%",
            costSavings: "₹2.3M",
            roi: "18%",
            sustainabilityInvestment: "₹15.2M"
          }
        }
      ]
    }
  }

  return {
    // state
    metrics,
    period,
    reportType,
    isGenerating,
    lastUpdated,
    reportJobs,
    loading,
    error,
    currentJob,
    projectData,
    riskData,
    impactData,
    // options
    periodOptions,
    reportTypes,
    // computed
    reportContent: generateReportContent(),
    // actions
    toggleMetric,
    selectPeriod,
    selectReportType,
    generate,
    loadReportJobs,
  }
}



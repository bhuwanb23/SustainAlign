import { useMemo, useRef, useState, useEffect } from 'react'
import { createReportJob, getReportJobs } from '../../../../lib/projectApi.js'

export default function useReportGenerator() {
  const [metrics, setMetrics] = useState({
    carbonFootprint: true,
    waterUsage: true,
    wasteManagement: false,
    energyEfficiency: true,
    socialImpact: false,
    governanceScore: true,
  })
  const [period, setPeriod] = useState('Q4 2024')
  const [reportType, setReportType] = useState('CSR Compliance')
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('2 mins ago')
  
  // New state for backend integration
  const [reportJobs, setReportJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentJob, setCurrentJob] = useState(null)

  const timerRef = useRef(null)

  // Load existing report jobs on mount
  useEffect(() => {
    loadReportJobs()
  }, [])

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
      
      // Prepare report data for backend
      const reportData = {
        period: period,
        report_type: reportType,
        metrics: metrics,
        company_id: null // Will be set from user context in production
      }
      
      console.log('📤 Generating report with data:', reportData)
      
      // Create report job in backend
      const newJob = await createReportJob(reportData)
      setCurrentJob(newJob)
      
      // Simulate generation process
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsGenerating(false)
        setLastUpdated('just now')
        
        // Refresh the jobs list
        loadReportJobs()
      }, 1500)
      
    } catch (err) {
      console.error('Failed to generate report:', err)
      setError(err.message)
      setIsGenerating(false)
    }
  }

  const periodOptions = useMemo(() => ['Q4 2024', 'Q3 2024', 'Annual 2024', 'Custom Range'], [])
  const reportTypes = useMemo(
    () => [
      { key: 'CSR Compliance', color: 'green', icon: '🛡️', border: 'border-green-200' },
      { key: 'ESG Progress', color: 'blue', icon: '📈', border: 'border-blue-200' },
      { key: 'SDG Impact', color: 'purple', icon: '🌐', border: 'border-purple-200' },
    ],
    []
  )

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
    // options
    periodOptions,
    reportTypes,
    // actions
    toggleMetric,
    selectPeriod,
    selectReportType,
    generate,
    loadReportJobs,
  }
}



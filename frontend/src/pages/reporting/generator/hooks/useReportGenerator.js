import { useMemo, useRef, useState } from 'react'

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

  const timerRef = useRef(null)

  const toggleMetric = (key) => setMetrics((m) => ({ ...m, [key]: !m[key] }))
  const selectPeriod = (p) => setPeriod(p)
  const selectReportType = (t) => setReportType(t)

  const generate = () => {
    if (isGenerating) return
    setIsGenerating(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsGenerating(false)
      setLastUpdated('just now')
    }, 1500)
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
    // options
    periodOptions,
    reportTypes,
    // actions
    toggleMetric,
    selectPeriod,
    selectReportType,
    generate,
  }
}



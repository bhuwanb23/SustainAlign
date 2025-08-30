import { useState, useEffect, useMemo, useCallback } from 'react'
import { getImpactSnapshot, getImpactTimeSeries, getImpactRegionStats, getImpactGoals } from '../../../../lib/projectApi'

// Advanced Impact Analytics Engine
class ImpactAnalyticsEngine {
  constructor() {
    this.analysisCache = new Map()
  }

  // Statistical Analysis Functions
  calculateStatistics(data) {
    if (!data || data.length === 0) return null
    
    const values = data.map(d => typeof d === 'object' ? d.value : d).filter(v => !isNaN(v))
    const n = values.length
    
    if (n === 0) return null
    
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / n
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n
    const stdDev = Math.sqrt(variance)
    const sorted = [...values].sort((a, b) => a - b)
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)]
    
    return {
      count: n,
      sum,
      mean: Math.round(mean * 100) / 100,
      median: Math.round(median * 100) / 100,
      stdDev: Math.round(stdDev * 100) / 100,
      min: Math.min(...values),
      max: Math.max(...values),
      range: Math.max(...values) - Math.min(...values),
      variance: Math.round(variance * 100) / 100
    }
  }

  // Trend Analysis with Linear Regression
  analyzeTrend(timeSeriesData) {
    if (!timeSeriesData || timeSeriesData.length < 2) return null
    
    const points = timeSeriesData.map((value, index) => ({ x: index, y: typeof value === 'object' ? value.value : value }))
    const n = points.length
    
    const sumX = points.reduce((a, b) => a + b.x, 0)
    const sumY = points.reduce((a, b) => a + b.y, 0)
    const sumXY = points.reduce((a, b) => a + b.x * b.y, 0)
    const sumX2 = points.reduce((a, b) => a + b.x * b.x, 0)
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n
    
    // Calculate R-squared (coefficient of determination)
    const yMean = sumY / n
    const ssRes = points.reduce((a, b) => a + Math.pow(b.y - (slope * b.x + intercept), 2), 0)
    const ssTot = points.reduce((a, b) => a + Math.pow(b.y - yMean, 2), 0)
    const rSquared = ssTot === 0 ? 0 : 1 - (ssRes / ssTot)
    
    // Determine trend direction and strength
    const trendDirection = slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable'
    const trendStrength = Math.abs(slope) < 0.1 ? 'weak' : Math.abs(slope) < 0.5 ? 'moderate' : 'strong'
    const confidence = rSquared < 0.3 ? 'low' : rSquared < 0.7 ? 'medium' : 'high'
    
    return {
      slope: Math.round(slope * 1000) / 1000,
      intercept: Math.round(intercept * 100) / 100,
      rSquared: Math.round(rSquared * 100) / 100,
      trendDirection,
      trendStrength,
      confidence,
      prediction: Math.round((slope * n + intercept) * 100) / 100
    }
  }

  // Anomaly Detection using Z-Score
  detectAnomalies(data, threshold = 2.5) {
    if (!data || data.length < 3) return []
    
    const values = data.map(d => typeof d === 'object' ? d.value : d).filter(v => !isNaN(v))
    const stats = this.calculateStatistics(values)
    
    if (!stats) return []
    
    return values.map((value, index) => {
      const zScore = Math.abs((value - stats.mean) / stats.stdDev)
      return {
        index,
        value,
        zScore: Math.round(zScore * 100) / 100,
        isAnomaly: zScore > threshold,
        severity: zScore > 3 ? 'high' : zScore > 2 ? 'medium' : 'low'
      }
    }).filter(item => item.isAnomaly)
  }

  // Seasonal Pattern Detection
  detectSeasonalPatterns(timeSeriesData, period = 12) {
    if (!timeSeriesData || timeSeriesData.length < period * 2) return null
    
    const values = timeSeriesData.map(d => typeof d === 'object' ? d.value : d)
    const seasonalFactors = []
    
    for (let i = 0; i < period; i++) {
      const seasonalValues = []
      for (let j = i; j < values.length; j += period) {
        seasonalValues.push(values[j])
      }
      const avg = seasonalValues.reduce((a, b) => a + b, 0) / seasonalValues.length
      seasonalFactors.push(Math.round(avg * 100) / 100)
    }
    
    const overallMean = values.reduce((a, b) => a + b, 0) / values.length
    const seasonalStrength = seasonalFactors.reduce((a, b) => a + Math.abs(b - overallMean), 0) / period
    
    return {
      seasonalFactors,
      seasonalStrength: Math.round(seasonalStrength * 100) / 100,
      hasSeasonality: seasonalStrength > overallMean * 0.1,
      period
    }
  }

  // Impact Scoring Algorithm (Multi-dimensional)
  calculateImpactScore(metrics) {
    const weights = {
      environmental: 0.35,
      social: 0.30,
      economic: 0.20,
      innovation: 0.15
    }
    
    const scores = {
      environmental: this.calculateEnvironmentalScore(metrics),
      social: this.calculateSocialScore(metrics),
      economic: this.calculateEconomicScore(metrics),
      innovation: this.calculateInnovationScore(metrics)
    }
    
    const totalScore = Object.keys(weights).reduce((total, key) => {
      return total + (scores[key] * weights[key])
    }, 0)
    
    return {
      total: Math.round(totalScore * 100) / 100,
      breakdown: scores,
      weights,
      grade: this.getScoreGrade(totalScore)
    }
  }

  calculateEnvironmentalScore(metrics) {
    const factors = {
      co2Reduction: metrics.co2_reduced_tons || 0,
      treesPlanted: metrics.trees_planted || 0,
      wasteReduced: metrics.waste_reduced_tons || 0,
      energySaved: metrics.energy_saved_kwh || 0
    }
    
    // Normalize and weight environmental factors
    const maxValues = { co2Reduction: 1000, treesPlanted: 10000, wasteReduced: 500, energySaved: 50000 }
    const weights = { co2Reduction: 0.4, treesPlanted: 0.3, wasteReduced: 0.2, energySaved: 0.1 }
    
    return Object.keys(factors).reduce((score, key) => {
      const normalized = Math.min(factors[key] / maxValues[key], 1)
      return score + (normalized * weights[key])
    }, 0)
  }

  calculateSocialScore(metrics) {
    const factors = {
      peopleReached: metrics.people_reached || 0,
      jobsCreated: metrics.jobs_created || 0,
      communitiesImpacted: metrics.communities_impacted || 0,
      educationProvided: metrics.education_provided || 0
    }
    
    const maxValues = { peopleReached: 10000, jobsCreated: 100, communitiesImpacted: 50, educationProvided: 1000 }
    const weights = { peopleReached: 0.35, jobsCreated: 0.25, communitiesImpacted: 0.25, educationProvided: 0.15 }
    
    return Object.keys(factors).reduce((score, key) => {
      const normalized = Math.min(factors[key] / maxValues[key], 1)
      return score + (normalized * weights[key])
    }, 0)
  }

  calculateEconomicScore(metrics) {
    const factors = {
      investmentLeveraged: metrics.investment_leveraged || 0,
      costSavings: metrics.cost_savings || 0,
      revenueGenerated: metrics.revenue_generated || 0
    }
    
    const maxValues = { investmentLeveraged: 1000000, costSavings: 500000, revenueGenerated: 200000 }
    const weights = { investmentLeveraged: 0.4, costSavings: 0.35, revenueGenerated: 0.25 }
    
    return Object.keys(factors).reduce((score, key) => {
      const normalized = Math.min(factors[key] / maxValues[key], 1)
      return score + (normalized * weights[key])
    }, 0)
  }

  calculateInnovationScore(metrics) {
    const factors = {
      newTechnologies: metrics.new_technologies || 0,
      patentsFiled: metrics.patents_filed || 0,
      researchPublications: metrics.research_publications || 0,
      partnershipsFormed: metrics.partnerships_formed || 0
    }
    
    const maxValues = { newTechnologies: 10, patentsFiled: 5, researchPublications: 20, partnershipsFormed: 15 }
    const weights = { newTechnologies: 0.3, patentsFiled: 0.25, researchPublications: 0.25, partnershipsFormed: 0.2 }
    
    return Object.keys(factors).reduce((score, key) => {
      const normalized = Math.min(factors[key] / maxValues[key], 1)
      return score + (normalized * weights[key])
    }, 0)
  }

  getScoreGrade(score) {
    if (score >= 0.9) return { grade: 'A+', color: '#059669', label: 'Exceptional' }
    if (score >= 0.8) return { grade: 'A', color: '#10B981', label: 'Excellent' }
    if (score >= 0.7) return { grade: 'B+', color: '#34D399', label: 'Very Good' }
    if (score >= 0.6) return { grade: 'B', color: '#6EE7B7', label: 'Good' }
    if (score >= 0.5) return { grade: 'C+', color: '#FCD34D', label: 'Satisfactory' }
    if (score >= 0.4) return { grade: 'C', color: '#F59E0B', label: 'Needs Improvement' }
    return { grade: 'D', color: '#EF4444', label: 'Poor' }
  }

  // Geographic Clustering Analysis
  analyzeGeographicDistribution(regionData) {
    if (!regionData || regionData.length === 0) return null
    
    const regions = regionData.map(r => ({
      name: r.region || r.name,
      impact: r.impact_score || r.value || 0,
      projects: r.project_count || 1,
      population: r.population || 1000000
    }))
    
    // Calculate impact density (impact per capita)
    const regionsWithDensity = regions.map(r => ({
      ...r,
      impactDensity: r.population > 0 ? r.impact / r.population : 0
    }))
    
    // Find clusters using k-means approximation
    const sortedByDensity = [...regionsWithDensity].sort((a, b) => b.impactDensity - a.impactDensity)
    const highImpact = sortedByDensity.slice(0, Math.ceil(sortedByDensity.length * 0.3))
    const mediumImpact = sortedByDensity.slice(Math.ceil(sortedByDensity.length * 0.3), Math.ceil(sortedByDensity.length * 0.7))
    const lowImpact = sortedByDensity.slice(Math.ceil(sortedByDensity.length * 0.7))
    
    return {
      clusters: {
        high: highImpact,
        medium: mediumImpact,
        low: lowImpact
      },
      totalRegions: regions.length,
      averageImpact: regions.reduce((a, b) => a + b.impact, 0) / regions.length,
      impactVariance: this.calculateVariance(regions.map(r => r.impact))
    }
  }

  calculateVariance(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    return values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
  }

  // Predictive Modeling
  predictFutureTrends(timeSeriesData, periods = 6) {
    if (!timeSeriesData || timeSeriesData.length < 3) return null
    
    const trend = this.analyzeTrend(timeSeriesData)
    if (!trend) return null
    
    const predictions = []
    const lastIndex = timeSeriesData.length - 1
    
    for (let i = 1; i <= periods; i++) {
      const predictedValue = trend.slope * (lastIndex + i) + trend.intercept
      predictions.push({
        period: lastIndex + i,
        value: Math.max(0, Math.round(predictedValue * 100) / 100),
        confidence: Math.max(0.1, trend.confidence === 'high' ? 0.9 : trend.confidence === 'medium' ? 0.7 : 0.5)
      })
    }
    
    return {
      predictions,
      trendAnalysis: trend,
      accuracy: trend.rSquared
    }
  }

  // Benchmarking Analysis
  calculateBenchmarks(metrics, industryAverages) {
    const benchmarks = {}
    
    Object.keys(metrics).forEach(key => {
      const current = metrics[key] || 0
      const average = industryAverages[key] || 0
      
      if (average > 0) {
        const ratio = current / average
        benchmarks[key] = {
          current,
          average,
          ratio: Math.round(ratio * 100) / 100,
          performance: ratio > 1.2 ? 'excellent' : ratio > 1.0 ? 'above_average' : ratio > 0.8 ? 'average' : 'below_average',
          improvement: Math.round((ratio - 1) * 100)
        }
      }
    })
    
    return benchmarks
  }

  // Risk Assessment
  assessImpactRisk(timeSeriesData, metrics) {
    const volatility = this.calculateVolatility(timeSeriesData)
    const anomalies = this.detectAnomalies(timeSeriesData)
    const trend = this.analyzeTrend(timeSeriesData)
    
    const riskFactors = {
      volatility: volatility > 0.3 ? 'high' : volatility > 0.15 ? 'medium' : 'low',
      anomalies: anomalies.length > 2 ? 'high' : anomalies.length > 0 ? 'medium' : 'low',
      trendStability: trend?.confidence === 'low' ? 'high' : trend?.confidence === 'medium' ? 'medium' : 'low'
    }
    
    const riskScore = Object.values(riskFactors).reduce((score, risk) => {
      return score + (risk === 'high' ? 3 : risk === 'medium' ? 2 : 1)
    }, 0) / 3
    
    return {
      riskScore: Math.round(riskScore * 100) / 100,
      riskLevel: riskScore > 2.5 ? 'high' : riskScore > 1.5 ? 'medium' : 'low',
      riskFactors,
      recommendations: this.generateRiskRecommendations(riskFactors)
    }
  }

  calculateVolatility(data) {
    if (!data || data.length < 2) return 0
    
    const values = data.map(d => typeof d === 'object' ? d.value : d)
    const returns = []
    
    for (let i = 1; i < values.length; i++) {
      if (values[i-1] !== 0) {
        returns.push((values[i] - values[i-1]) / values[i-1])
      }
    }
    
    const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length
    const variance = returns.reduce((a, b) => a + Math.pow(b - meanReturn, 2), 0) / returns.length
    
    return Math.sqrt(variance)
  }

  generateRiskRecommendations(riskFactors) {
    const recommendations = []
    
    if (riskFactors.volatility === 'high') {
      recommendations.push('Implement volatility reduction strategies')
    }
    if (riskFactors.anomalies === 'high') {
      recommendations.push('Strengthen anomaly detection and response protocols')
    }
    if (riskFactors.trendStability === 'high') {
      recommendations.push('Improve trend forecasting accuracy with additional data sources')
    }
    
    return recommendations.length > 0 ? recommendations : ['Risk levels are within acceptable ranges']
  }
}

// Initialize the analytics engine
const analyticsEngine = new ImpactAnalyticsEngine()

export default function useImpact() {
  const [snapshot, setSnapshot] = useState(null)
  const [timeSeries, setTimeSeries] = useState({})
  const [regionStats, setRegionStats] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [analysisResults, setAnalysisResults] = useState({})

  const fetchSnapshot = async () => {
    try {
      const data = await getImpactSnapshot()
      // Convert cards array to object format for easier access
      const snapshotObj = {}
      data.forEach(card => {
        const key = card.label.toLowerCase().replace(/[^a-z0-9]/g, '_')
        snapshotObj[key] = card.value
      })
      setSnapshot(snapshotObj)
    } catch (err) {
      console.error('Failed to fetch impact snapshot:', err)
      setError(err.message)
    }
  }

  const fetchTimeSeries = async (metricName, filters = {}) => {
    try {
      const data = await getImpactTimeSeries(metricName, filters)
      setTimeSeries(prev => ({
        ...prev,
        [metricName]: data
      }))
    } catch (err) {
      console.error(`Failed to fetch time series for ${metricName}:`, err)
      setError(err.message)
    }
  }

  const fetchRegionStats = async (filters = {}) => {
    try {
      const data = await getImpactRegionStats(filters)
      setRegionStats(data)
    } catch (err) {
      console.error('Failed to fetch region stats:', err)
      setError(err.message)
    }
  }

  const fetchGoals = async (filters = {}) => {
    try {
      const data = await getImpactGoals(filters)
      setGoals(data)
    } catch (err) {
      console.error('Failed to fetch impact goals:', err)
      setError(err.message)
    }
  }

  // Advanced Analysis Functions
  const performAdvancedAnalysis = useCallback(() => {
    if (!snapshot || !timeSeries || !regionStats) return

    const analysis = {
      // Statistical Analysis
      statistics: {},
      trends: {},
      anomalies: {},
      seasonalPatterns: {},
      
      // Impact Scoring
      impactScore: null,
      
      // Geographic Analysis
      geographicDistribution: null,
      
      // Predictive Modeling
      predictions: {},
      
      // Risk Assessment
      riskAssessment: null,
      
      // Benchmarks
      benchmarks: null
    }

    // Analyze each time series
    Object.keys(timeSeries).forEach(metric => {
      const data = timeSeries[metric]
      if (data && data.length > 0) {
        analysis.statistics[metric] = analyticsEngine.calculateStatistics(data)
        analysis.trends[metric] = analyticsEngine.analyzeTrend(data)
        analysis.anomalies[metric] = analyticsEngine.detectAnomalies(data)
        analysis.seasonalPatterns[metric] = analyticsEngine.detectSeasonalPatterns(data)
        analysis.predictions[metric] = analyticsEngine.predictFutureTrends(data)
      }
    })

    // Calculate overall impact score
    if (snapshot) {
      analysis.impactScore = analyticsEngine.calculateImpactScore(snapshot)
    }

    // Analyze geographic distribution
    if (regionStats.length > 0) {
      analysis.geographicDistribution = analyticsEngine.analyzeGeographicDistribution(regionStats)
    }

    // Risk assessment
    const primaryMetric = timeSeries.co2_reduced_tons || timeSeries.trees_planted || Object.values(timeSeries)[0]
    if (primaryMetric) {
      analysis.riskAssessment = analyticsEngine.assessImpactRisk(primaryMetric, snapshot)
    }

    // Industry benchmarks (mock data for demonstration)
    const industryAverages = {
      co2_reduced_tons: 500,
      trees_planted: 5000,
      people_reached: 5000,
      investment_leveraged: 500000
    }
    if (snapshot) {
      analysis.benchmarks = analyticsEngine.calculateBenchmarks(snapshot, industryAverages)
    }

    setAnalysisResults(analysis)
  }, [snapshot, timeSeries, regionStats])

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        await Promise.all([
          fetchSnapshot(),
          fetchTimeSeries('co2_reduced_tons'),
          fetchTimeSeries('trees_planted'),
          fetchTimeSeries('people_reached'),
          fetchTimeSeries('investment_leveraged'),
          fetchRegionStats(),
          fetchGoals()
        ])
      } catch (err) {
        console.error('Failed to load impact data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadAllData()
  }, [])

  // Perform analysis when data changes
  useEffect(() => {
    if (!loading && snapshot && Object.keys(timeSeries).length > 0) {
      performAdvancedAnalysis()
    }
  }, [loading, snapshot, timeSeries, regionStats, performAdvancedAnalysis])

  const refreshData = useCallback(() => {
    setLoading(true)
    setError(null)
    loadAllData()
  }, [])

  return {
    snapshot,
    timeSeries,
    regionStats,
    goals,
    loading,
    error,
    analysisResults,
    refreshData,
    fetchTimeSeries,
    fetchRegionStats,
    fetchGoals,
    performAdvancedAnalysis
  }
}

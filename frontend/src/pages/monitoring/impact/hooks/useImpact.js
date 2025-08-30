import { useState, useEffect, useMemo, useCallback } from 'react'
import { getTrackerProjects, getProjects } from '../../../../lib/projectApi'

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

  // Project-based Impact Analysis
  analyzeProjectImpact(projects) {
    if (!projects || projects.length === 0) return null

    // Extract impact metrics from projects
    const impactMetrics = {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'on-track' || p.status === 'funded' || p.status === 'published').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      delayedProjects: projects.filter(p => p.status === 'delayed').length,
      totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
      totalProgress: projects.reduce((sum, p) => sum + (p.progressPct || 0), 0) / projects.length,
      averageImpactScore: projects.reduce((sum, p) => {
        const score = p.impact_score || p.impactScore || 0
        return sum + (typeof score === 'number' ? score : 0)
      }, 0) / projects.length
    }

    // Generate time series data based on project progress over time
    const timeSeriesData = this.generateProjectTimeSeries(projects)
    
    // Calculate regional distribution
    const regionalData = this.generateRegionalData(projects)

    return {
      metrics: impactMetrics,
      timeSeries: timeSeriesData,
      regionalData: regionalData
    }
  }

  generateProjectTimeSeries(projects) {
    // Generate monthly progress data for the last 12 months
    const months = 12
    const timeSeries = {
      co2_reduced_tons: [],
      trees_planted: [],
      people_reached: [],
      investment_leveraged: []
    }

    for (let i = 0; i < months; i++) {
      const monthProgress = projects.reduce((monthData, project) => {
        const progress = (project.progressPct || 0) / 100
        const monthlyProgress = progress / months
        
        // Simulate impact based on project progress and budget
        const budget = project.budget || 100000
        const impactMultiplier = project.impact_score || 1
        
        monthData.co2_reduced_tons += (budget * 0.001 * monthlyProgress * impactMultiplier)
        monthData.trees_planted += (budget * 0.01 * monthlyProgress * impactMultiplier)
        monthData.people_reached += (budget * 0.1 * monthlyProgress * impactMultiplier)
        monthData.investment_leveraged += (budget * monthlyProgress * impactMultiplier)
        
        return monthData
      }, { co2_reduced_tons: 0, trees_planted: 0, people_reached: 0, investment_leveraged: 0 })

      Object.keys(timeSeries).forEach(key => {
        timeSeries[key].push({
          period: i + 1,
          value: Math.round(monthProgress[key]),
          date: new Date(2024, i, 1).toISOString().split('T')[0]
        })
      })
    }

    return timeSeries
  }

  generateRegionalData(projects) {
    // Group projects by region/location
    const regionMap = new Map()
    
    projects.forEach(project => {
      // Handle location object or string
      let location = 'Unknown'
      if (project.location) {
        if (typeof project.location === 'string') {
          location = project.location
        } else if (typeof project.location === 'object') {
          // Handle location object with city, country, region properties
          const parts = []
          if (project.location.city) parts.push(project.location.city)
          if (project.location.region) parts.push(project.location.region)
          if (project.location.country) parts.push(project.location.country)
          location = parts.length > 0 ? parts.join(', ') : 'Unknown'
        }
      } else if (project.region) {
        location = typeof project.region === 'string' ? project.region : 'Unknown'
      }
      
      const budget = project.budget || 0
      const impact = project.impact_score || 1
      
      if (!regionMap.has(location)) {
        regionMap.set(location, {
          name: location,
          projects: 0,
          totalBudget: 0,
          totalImpact: 0,
          population: Math.floor(Math.random() * 1000000) + 100000 // Mock population
        })
      }
      
      const region = regionMap.get(location)
      region.projects += 1
      region.totalBudget += budget
      region.totalImpact += impact
    })

    return Array.from(regionMap.values()).map(region => ({
      ...region,
      impact_score: region.totalImpact,
      project_count: region.projects
    }))
  }
}

// Initialize the analytics engine
const analyticsEngine = new ImpactAnalyticsEngine()

export default function useImpact() {
  const [projects, setProjects] = useState([])
  const [snapshot, setSnapshot] = useState(null)
  const [timeSeries, setTimeSeries] = useState({})
  const [regionStats, setRegionStats] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [analysisResults, setAnalysisResults] = useState({})

  // Fetch real project data from tracker
  const fetchProjectData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Fetching project data for impact analysis...')
      
      // Fetch all project data (tracker + approved + published)
      const [trackerProjects, approvedProjects, publishedProjects] = await Promise.all([
        getTrackerProjects(),
        getProjects({ status: 'funded' }),
        getProjects({ status: 'published' })
      ])
      
      // Combine all projects
      const allProjects = [
        ...(Array.isArray(trackerProjects) ? trackerProjects : []),
        ...(approvedProjects?.projects || approvedProjects || []),
        ...(publishedProjects?.projects || publishedProjects || [])
      ]
      
      // Remove duplicates
      const uniqueProjects = allProjects.filter((project, index, self) => 
        index === self.findIndex(p => p.id === project.id)
      )
      
      console.log('📊 Total projects for impact analysis:', uniqueProjects.length)
      setProjects(uniqueProjects)
      
    } catch (err) {
      console.error('❌ Error fetching project data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Generate impact data from real projects
  const generateImpactData = useCallback(() => {
    if (!projects || projects.length === 0) return

    console.log('🔬 Generating impact data from', projects.length, 'projects...')

    // Generate snapshot from project data
    const projectAnalysis = analyticsEngine.analyzeProjectImpact(projects)
    
    if (projectAnalysis) {
      // Create snapshot
      const snapshotData = [
        { label: 'Total Projects', value: projectAnalysis.metrics.totalProjects },
        { label: 'Active Projects', value: projectAnalysis.metrics.activeProjects },
        { label: 'Completed Projects', value: projectAnalysis.metrics.completedProjects },
        { label: 'Total Budget', value: projectAnalysis.metrics.totalBudget },
        { label: 'Average Progress', value: Math.round(projectAnalysis.metrics.totalProgress) },
        { label: 'Average Impact Score', value: Math.round(projectAnalysis.metrics.averageImpactScore * 100) / 100 }
      ]
      setSnapshot(snapshotData)
      
      // Set time series data
      setTimeSeries(projectAnalysis.timeSeries)
      
      // Set regional data
      setRegionStats(projectAnalysis.regionalData)
      
      // Generate goals based on current progress
      const goalsData = [
        {
          id: 1,
          title: 'Project Completion Rate',
          target: 100,
          current: Math.round((projectAnalysis.metrics.completedProjects / projectAnalysis.metrics.totalProjects) * 100),
          unit: '%',
          deadline: '2024-12-31',
          progress: Math.round((projectAnalysis.metrics.completedProjects / projectAnalysis.metrics.totalProjects) * 100)
        },
        {
          id: 2,
          title: 'Budget Utilization',
          target: 100,
          current: Math.round(projectAnalysis.metrics.totalProgress),
          unit: '%',
          deadline: '2024-12-31',
          progress: Math.round(projectAnalysis.metrics.totalProgress)
        },
        {
          id: 3,
          title: 'Impact Score Improvement',
          target: 5,
          current: Math.round(projectAnalysis.metrics.averageImpactScore * 100) / 100,
          unit: 'score',
          deadline: '2024-12-31',
          progress: Math.round((projectAnalysis.metrics.averageImpactScore / 5) * 100)
        }
      ]
      setGoals(goalsData)
    }
  }, [projects])

  // Advanced Analysis Functions
  const performAdvancedAnalysis = useCallback(() => {
    if (!projects || projects.length === 0) return

    console.log('🧠 Performing advanced analysis on', projects.length, 'projects...')

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

    // Analyze time series data
    Object.keys(timeSeries).forEach(metric => {
      const data = timeSeries[metric]
      if (data && data.length > 0) {
        const values = data.map(d => d.value)
        analysis.statistics[metric] = analyticsEngine.calculateStatistics(values)
        analysis.trends[metric] = analyticsEngine.analyzeTrend(values)
        analysis.anomalies[metric] = analyticsEngine.detectAnomalies(values)
        analysis.seasonalPatterns[metric] = analyticsEngine.detectSeasonalPatterns(values)
        analysis.predictions[metric] = analyticsEngine.predictFutureTrends(values)
      }
    })

    // Calculate overall impact score from project metrics
    if (snapshot) {
      const metrics = {}
      snapshot.forEach(item => {
        const key = item.label.toLowerCase().replace(/[^a-z0-9]/g, '_')
        metrics[key] = item.value
      })
      analysis.impactScore = analyticsEngine.calculateImpactScore(metrics)
    }

    // Analyze geographic distribution
    if (regionStats.length > 0) {
      analysis.geographicDistribution = analyticsEngine.analyzeGeographicDistribution(regionStats)
    }

    // Risk assessment based on project progress volatility
    const progressData = projects.map(p => p.progressPct || 0).filter(p => p > 0)
    if (progressData.length > 0) {
      analysis.riskAssessment = analyticsEngine.assessImpactRisk(progressData, {})
    }

    // Industry benchmarks (mock data for demonstration)
    const industryAverages = {
      total_projects: 50,
      active_projects: 35,
      completed_projects: 15,
      total_budget: 5000000,
      average_progress: 65,
      average_impact_score: 3.5
    }
    if (snapshot) {
      const metrics = {}
      snapshot.forEach(item => {
        const key = item.label.toLowerCase().replace(/[^a-z0-9]/g, '_')
        metrics[key] = item.value
      })
      analysis.benchmarks = analyticsEngine.calculateBenchmarks(metrics, industryAverages)
    }

    setAnalysisResults(analysis)
    console.log('✅ Advanced analysis completed')
  }, [projects, timeSeries, snapshot, regionStats])

  useEffect(() => {
    fetchProjectData()
  }, [])

  // Generate impact data when projects change
  useEffect(() => {
    if (projects.length > 0) {
      generateImpactData()
    }
  }, [projects, generateImpactData])

  // Perform analysis when data changes
  useEffect(() => {
    if (!loading && projects.length > 0 && Object.keys(timeSeries).length > 0) {
      performAdvancedAnalysis()
    }
  }, [loading, projects, timeSeries, snapshot, regionStats, performAdvancedAnalysis])

  const refreshData = useCallback(() => {
    fetchProjectData()
  }, [])

  return {
    snapshot,
    timeSeries,
    regionStats,
    goals,
    loading,
    error,
    analysisResults,
    projects,
    refreshData
  }
}

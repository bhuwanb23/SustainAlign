import { useState, useEffect } from 'react'
import { getImpactSnapshot, getImpactTimeSeries, getImpactRegionStats, getImpactGoals } from '../../../../lib/projectApi'

export default function useImpact() {
  const [snapshot, setSnapshot] = useState(null)
  const [timeSeries, setTimeSeries] = useState({})
  const [regionStats, setRegionStats] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        [metricName]: data.map(point => point.value) // Extract just the values for charting
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

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        await Promise.all([
          fetchSnapshot(),
          fetchTimeSeries('co2_reduced_tons'),
          fetchTimeSeries('trees_planted'),
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

  const refreshData = () => {
    setLoading(true)
    setError(null)
    loadAllData()
  }

  return {
    snapshot,
    timeSeries,
    regionStats,
    goals,
    loading,
    error,
    refreshData,
    fetchTimeSeries,
    fetchRegionStats,
    fetchGoals
  }
}

import { useMemo, useState, useCallback, useEffect } from 'react'
import { getTrackerProjects, getTrackerTimeline } from '../../../../lib/projectApi'

const SDG = {
  green: '#4CAF50',
  teal: '#009688',
  blue: '#2196F3',
  orange: '#FF9800',
}

export default function useTracker() {
  const [filter, setFilter] = useState('all') // all | on-track | delayed | completed
  const [projects, setProjects] = useState([])
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tracker data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [projectsData, timelineData] = await Promise.all([
        getTrackerProjects({ status: filter === 'all' ? undefined : filter }),
        getTrackerTimeline()
      ])
      
      setProjects(projectsData)
      setTimeline(timelineData)
    } catch (err) {
      console.error('Error fetching tracker data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.status === filter)
  }, [filter, projects])

  return { 
    filter, 
    setFilter, 
    projects: filtered, 
    timeline,
    loading,
    error,
    refreshData: fetchData
  }
}

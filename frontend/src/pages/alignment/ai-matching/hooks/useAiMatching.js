import { useState, useEffect } from 'react'
import { getAiMatches } from '../../../../lib/projectApi'

export default function useAiMatching() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})

  const fetchMatches = async (newFilters = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      // Combine existing filters with new ones
      const combinedFilters = { ...filters, ...newFilters }
      setFilters(combinedFilters)
      
      const data = await getAiMatches(combinedFilters)
      setMatches(data || [])
    } catch (err) {
      console.error('Failed to fetch AI matches:', err)
      setError(err.message)
      // Fallback to empty array on error
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const applyFilters = (newFilters) => {
    fetchMatches(newFilters)
  }

  const refreshMatches = () => {
    fetchMatches()
  }

  return {
    matches,
    loading,
    error,
    applyFilters,
    refreshMatches,
    filters
  }
}



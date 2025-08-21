import { useMemo, useState } from 'react'

const allNgos = [
  {
    id: 'ngo-1',
    name: 'Green Earth Foundation',
    sector: 'Environmental Protection',
    risk: 'Low',
    highlightMetric: { label: 'Financial Stability', valuePct: 92 },
  },
  {
    id: 'ngo-2',
    name: 'Education First NGO',
    sector: 'Education & Development',
    risk: 'Medium',
    highlightMetric: { label: 'Compliance Score', valuePct: 68 },
  },
  {
    id: 'ngo-3',
    name: 'Community Aid Network',
    sector: 'Community Development',
    risk: 'High',
    highlightMetric: { label: 'Execution Track', valuePct: 34 },
  },
]

export default function useRiskScoring() {
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState('All')
  const [selectedNgoId, setSelectedNgoId] = useState('ngo-1')

  const ngos = useMemo(() => {
    return allNgos.filter((n) => {
      const matchesQuery = !query || n.name.toLowerCase().includes(query.toLowerCase())
      const matchesRisk = riskFilter === 'All' || n.risk === riskFilter
      return matchesQuery && matchesRisk
    })
  }, [query, riskFilter])

  const selectedNgo = useMemo(
    () => allNgos.find((n) => n.id === selectedNgoId) || allNgos[0],
    [selectedNgoId]
  )

  const metrics = useMemo(
    () => ({ total: 127, low: 89, medium: 28, high: 10 }),
    []
  )

  const radarSeries = useMemo(
    () => ({ categories: ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'], data: [92, 88, 95, 90, 85] }),
    []
  )

  const trendSeries = useMemo(
    () => ({ categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], avg: [75, 78, 82, 85, 88, 90], bench: [70, 72, 75, 78, 80, 82] }),
    []
  )

  return {
    // filters
    query,
    setQuery,
    riskFilter,
    setRiskFilter,
    ngos,
    selectedNgo,
    setSelectedNgoId,
    // headline metrics
    metrics,
    // charts
    radarSeries,
    trendSeries,
  }
}



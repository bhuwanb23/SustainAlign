import { useEffect, useMemo, useState } from 'react'

const PROJECTS = [
  {
    id: 'p1',
    title: 'Clean Water Initiative',
    ngo: 'WaterAid Foundation',
    region: 'Africa',
    sdgNumber: 6,
    sdgLabel: 'Clean Water and Sanitation',
    rating: 4.8,
    budget: 75000,
    budgetLabel: '$75,000',
    duration: '8 months',
    location: 'Kenya',
    tags: ['Environment', 'Health'],
    color: 'emerald',
    icon: '🌱',
    description:
      'Providing clean water access to 5,000 rural families through sustainable well construction and purification.',
  },
  {
    id: 'p2',
    title: 'Digital Learning Hub',
    ngo: 'Education For All',
    region: 'Asia Pacific',
    sdgNumber: 4,
    sdgLabel: 'Quality Education',
    rating: 4.6,
    budget: 120000,
    budgetLabel: '$120,000',
    duration: '12 months',
    location: 'India',
    tags: ['Education', 'Technology'],
    color: 'blue',
    icon: '🎓',
    description:
      'Establishing digital learning centers in underserved communities to reach 2,000 students.',
  },
  {
    id: 'p3',
    title: 'Sustainable Farming Program',
    ngo: 'Green Earth Initiative',
    region: 'Africa',
    sdgNumber: 2,
    sdgLabel: 'Zero Hunger',
    rating: 4.9,
    budget: 90000,
    budgetLabel: '$90,000',
    duration: '18 months',
    location: 'Ghana',
    tags: ['Food Security', 'Environment'],
    color: 'orange',
    icon: '🍽️',
    description:
      'Training smallholder farmers in sustainable agriculture to improve food security and income.',
  },
]

export default function useProjectSearch() {
  const [query, setQuery] = useState('')
  const [advanced, setAdvanced] = useState({
    region: 'All Regions',
    sdg: 'All SDGs',
    budgetRange: 'Any',
    timeline: 'Any',
  })
  const [impactAreas, setImpactAreas] = useState({
    Environment: false,
    Education: false,
    Healthcare: false,
    'Food Security': false,
  })
  const [sort, setSort] = useState('Relevance')
  const [view, setView] = useState('list')

  const regionOptions = ['All Regions', 'Asia Pacific', 'Africa', 'Latin America']
  const sdgOptions = ['All SDGs', 'Quality Education', 'Clean Water', 'Climate Action', 'Zero Hunger']
  const budgetOptions = ['Any', '$10K - $50K', '$50K - $100K', '$100K+']
  const timelineOptions = ['Any', '3-6 months', '6-12 months', '1+ years']

  const setAdvancedFilter = (key, value) => setAdvanced((prev) => ({ ...prev, [key]: value }))
  const toggleImpactArea = (name) => setImpactAreas((prev) => ({ ...prev, [name]: !prev[name] }))

  const totalCount = 156

  const results = useMemo(() => {
    const selectedAreas = Object.entries(impactAreas)
      .filter(([, v]) => v)
      .map(([k]) => k)

    const inBudgetRange = (val) => {
      switch (advanced.budgetRange) {
        case '$10K - $50K':
          return val >= 10000 && val <= 50000
        case '$50K - $100K':
          return val > 50000 && val <= 100000
        case '$100K+':
          return val > 100000
        default:
          return true
      }
    }

    const inTimeline = (str) => {
      if (advanced.timeline === 'Any') return true
      const months = Number((str || '').split(' ')[0]) || 0
      if (advanced.timeline === '3-6 months') return months >= 3 && months <= 6
      if (advanced.timeline === '6-12 months') return months > 6 && months <= 12
      if (advanced.timeline === '1+ years') return months > 12
      return true
    }

    let list = PROJECTS.filter((p) =>
      (!query || `${p.title} ${p.ngo}`.toLowerCase().includes(query.toLowerCase())) &&
      (advanced.region === 'All Regions' || p.region === advanced.region) &&
      (advanced.sdg === 'All SDGs' || p.sdgLabel.includes(advanced.sdg)) &&
      inBudgetRange(p.budget) &&
      inTimeline(p.duration) &&
      (selectedAreas.length === 0 || selectedAreas.every((a) => p.tags.includes(a)))
    )

    if (sort === 'Budget: Low to High') list = [...list].sort((a, b) => a.budget - b.budget)
    else if (sort === 'Timeline: Shortest') list = [...list].sort((a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0))

    return list
  }, [query, advanced, impactAreas, sort])

  useEffect(() => {
    // placeholder for API integration
  }, [query, advanced, impactAreas, sort, view])

  return {
    // options
    regionOptions,
    sdgOptions,
    budgetOptions,
    timelineOptions,
    // state
    query,
    setQuery,
    advanced,
    setAdvancedFilter,
    impactAreas,
    toggleImpactArea,
    sort,
    setSort,
    view,
    setView,
    // data
    results,
    totalCount,
  }
}



import { useEffect, useMemo, useState } from 'react'

const MOCK = [
  { id: 'p1', title: 'Clean Water Initiative', ngo: 'AquaTrust', sdg: 'Clean Water and Sanitation', credibility: 'High', impact: '50,000 people', budget: 450000 },
  { id: 'p2', title: 'Education Access Program', ngo: 'EduCare', sdg: 'Quality Education', credibility: 'Medium', impact: '10,000 students', budget: 320000 },
  { id: 'p3', title: 'Renewable Energy Project', ngo: 'SunRise', sdg: 'Affordable and Clean Energy', credibility: 'High', impact: '5MW Solar', budget: 780000 },
]

export default function useProjectSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ sector: 'All', geo: '', budget: '', sdg: 'Any' })

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }))

  const results = useMemo(() => {
    return MOCK.filter((p) =>
      (!query || p.title.toLowerCase().includes(query.toLowerCase())) &&
      (filters.sdg === 'Any' || p.sdg === filters.sdg) &&
      (!filters.budget || p.budget <= Number(filters.budget))
    )
  }, [query, filters])

  useEffect(() => {
    // placeholder for API integration
  }, [query, filters])

  return { query, setQuery, filters, setFilter, results }
}



import { useMemo, useState } from 'react'
import MatchList from './components/MatchList.jsx'
import HeroStats from './components/HeroStats.jsx'
import FiltersPanel from './components/FiltersPanel.jsx'
import { HERO_STATS } from './constants/index.js'
import useAiMatching from './hooks/useAiMatching.js'

export default function AiMatchingPage() {
  const { matches } = useAiMatching()
  const [sortBy, setSortBy] = useState('alignment')

  const sorted = useMemo(() => {
    const copy = [...matches]
    if (sortBy === 'alignment') {
      copy.sort((a, b) => b.alignmentScore - a.alignmentScore)
    } else if (sortBy === 'investment') {
      // naive sort by first digit in range
      const parse = (r) => parseInt(String(r).replace(/[^0-9]/g, '') || '0', 10)
      copy.sort((a, b) => parse(a.investmentRange) - parse(b.investmentRange))
    } else if (sortBy === 'timeline') {
      const months = (t) => parseInt(String(t).split(' ')[0], 10) || 0
      copy.sort((a, b) => months(a.timeline) - months(b.timeline))
    }
    return copy
  }, [matches, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <HeroStats stats={HERO_STATS} />
        <div className="flex gap-8">
          <FiltersPanel onApply={() => {}} />
          <section className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Recommended Projects</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
              >
                <option value="alignment">Sort by Alignment Score</option>
                <option value="investment">Sort by Investment Amount</option>
                <option value="timeline">Sort by Timeline</option>
              </select>
            </div>
            <MatchList items={sorted} />
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 transition-colors">
                Load More Projects
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}



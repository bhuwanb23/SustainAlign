import { useState } from 'react'
import { ALIGNMENT_FILTERS, INVESTMENT_RANGES, TIMELINE_FILTERS, SDG_FOCUS } from '../constants/index.js'

export default function FiltersPanel({ onApply }) {
  const [selectedSdgs, setSelectedSdgs] = useState(new Set())
  const [alignmentFilter, setAlignmentFilter] = useState('high')
  const [investmentRange, setInvestmentRange] = useState('All Ranges')
  const [timelineFilters, setTimelineFilters] = useState(new Set(['short', 'medium']))

  const toggleSdg = (id) => {
    const next = new Set(selectedSdgs)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedSdgs(next)
  }

  const toggleTimeline = (id) => {
    const next = new Set(timelineFilters)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setTimelineFilters(next)
  }

  const handleApply = () => {
    const filters = {
      alignment: alignmentFilter,
      investment_range: investmentRange,
      timeline: Array.from(timelineFilters),
      sdgs: Array.from(selectedSdgs)
    }
    onApply(filters)
  }

  return (
    <aside className="w-full lg:w-80">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Refine Results</h3>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Alignment Score</label>
          <div className="space-y-2">
            {ALIGNMENT_FILTERS.map((f) => (
              <label key={f.id} className="flex items-center">
                <input 
                  type="radio" 
                  name="alignment"
                  value={f.id}
                  checked={alignmentFilter === f.id}
                  onChange={(e) => setAlignmentFilter(e.target.value)}
                  className="rounded text-emerald-600" 
                />
                <span className="ml-2 text-sm">{f.label}</span>
                <span className={`ml-auto w-3 h-3 rounded-full ${f.colorDotClass}`} />
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Investment Range</label>
          <select 
            value={investmentRange}
            onChange={(e) => setInvestmentRange(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
          >
            {INVESTMENT_RANGES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Timeline</label>
          <div className="space-y-2">
            {TIMELINE_FILTERS.map((t) => (
              <label key={t.id} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={timelineFilters.has(t.id)}
                  onChange={() => toggleTimeline(t.id)}
                  className="rounded text-emerald-600" 
                />
                <span className="ml-2 text-sm">{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">SDG Focus</label>
          <div className="grid grid-cols-3 gap-2">
            {SDG_FOCUS.map((sdg) => {
              const active = selectedSdgs.has(sdg.id)
              return (
                <button
                  key={sdg.id}
                  type="button"
                  onClick={() => toggleSdg(sdg.id)}
                  className={`text-center p-2 rounded border transition-colors ${sdg.colorClass} ${active ? 'ring-2 ring-emerald-500' : ''}`}
                >
                  <div className="text-xl leading-none">{sdg.icon}</div>
                  <div className="text-xs mt-1">{sdg.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        <button onClick={handleApply} className="w-full bg-emerald-600 text-white py-2 rounded-xl shadow hover:bg-emerald-700 transition-colors">
          Apply Filters
        </button>
      </div>
    </aside>
  )
}



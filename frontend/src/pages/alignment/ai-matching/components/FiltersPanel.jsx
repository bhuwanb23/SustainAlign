import { useState } from 'react'
import { ALIGNMENT_FILTERS, INVESTMENT_RANGES, TIMELINE_FILTERS, SDG_FOCUS } from '../constants/index.js'

export default function FiltersPanel({ onApply }) {
  const [selectedSdgs, setSelectedSdgs] = useState(new Set())

  const toggleSdg = (id) => {
    const next = new Set(selectedSdgs)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedSdgs(next)
  }

  return (
    <aside className="w-full lg:w-80">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 sticky top-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Refine Results</h3>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Alignment Score</label>
          <div className="space-y-2">
            {ALIGNMENT_FILTERS.map((f) => (
              <label key={f.id} className="flex items-center">
                <input type="checkbox" className="rounded text-emerald-600" defaultChecked={f.defaultChecked} />
                <span className="ml-2 text-sm">{f.label}</span>
                <span className={`ml-auto w-3 h-3 rounded-full ${f.colorDotClass}`} />
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Investment Range</label>
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2">
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
                <input type="checkbox" className="rounded text-emerald-600" defaultChecked={t.defaultChecked} />
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

        <button onClick={onApply} className="w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition-colors">
          Apply Filters
        </button>
      </div>
    </aside>
  )
}



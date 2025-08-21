export default function Sidebar({ metrics, toggleMetric, period, periodOptions, selectPeriod, onGenerate }) {
  const items = [
    { key: 'carbonFootprint', label: 'Carbon Footprint', color: 'text-green-600' },
    { key: 'waterUsage', label: 'Water Usage', color: 'text-blue-600' },
    { key: 'wasteManagement', label: 'Waste Management', color: 'text-purple-600' },
    { key: 'energyEfficiency', label: 'Energy Efficiency', color: 'text-orange-600' },
    { key: 'socialImpact', label: 'Social Impact', color: 'text-red-600' },
    { key: 'governanceScore', label: 'Governance Score', color: 'text-indigo-600' },
  ]
  return (
    <aside className="w-80 bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Configuration</h3>
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Include Metrics</h4>
        {items.map((it) => (
          <label key={it.key} className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" checked={!!metrics[it.key]} onChange={() => toggleMetric(it.key)} />
            <span className={`text-sm text-gray-700 ${it.color.replace('text-', '')}`.trim()}>{it.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Reporting Period</h4>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={period} onChange={(e) => selectPeriod(e.target.value)}>
          {periodOptions.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <button className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors" onClick={onGenerate}>
        ✨ Generate Report
      </button>
    </aside>
  )
}



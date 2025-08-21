const riskPill = (level) => level === 'Low' ? 'text-risk-low bg-green-50' : level === 'Medium' ? 'text-risk-medium bg-yellow-50' : 'text-risk-high bg-red-50'

export function Sidebar({ query, setQuery, riskFilter, setRiskFilter, ngos, onSelect }) {
  return (
    <div className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">🛡️</div>
          <h1 className="text-xl font-bold text-gray-900">Risk Assessment</h1>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NGOs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {ngos.map((n) => (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            className={`text-left w-full bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 ${n.risk === 'Low' ? 'border-l-risk-low' : n.risk === 'Medium' ? 'border-l-risk-medium' : 'border-l-risk-high'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${n.risk === 'Low' ? 'bg-risk-low' : n.risk === 'Medium' ? 'bg-risk-medium' : 'bg-risk-high'} text-white text-sm`}>✔</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{n.name}</h3>
                  <p className="text-xs text-gray-500">{n.sector}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${riskPill(n.risk)}`}>{n.risk} Risk</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">{n.highlightMetric.label}</span>
                <span className="font-medium">{n.highlightMetric.valuePct}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className={`${n.risk === 'Low' ? 'bg-risk-low' : n.risk === 'Medium' ? 'bg-risk-medium' : 'bg-risk-high'} h-1 rounded-full`} style={{ width: `${n.highlightMetric.valuePct}%` }}></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function HeadlineMetrics({ metrics }) {
  const items = [
    { label: 'Total NGOs', value: metrics.total, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', icon: '🏢' },
    { label: 'Low Risk', value: metrics.low, iconBg: 'bg-green-100', iconColor: 'text-risk-low', icon: '🛡️' },
    { label: 'Medium Risk', value: metrics.medium, iconBg: 'bg-yellow-100', iconColor: 'text-risk-medium', icon: '⚠️' },
    { label: 'High Risk', value: metrics.high, iconBg: 'bg-red-100', iconColor: 'text-risk-high', icon: '❗' },
  ]
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {items.map((k) => (
        <div key={k.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{k.label}</p>
              <p className={`text-2xl font-bold ${k.iconColor === 'text-blue-600' ? 'text-gray-900' : k.iconColor}`}>{k.value}</p>
            </div>
            <div className={`w-12 h-12 ${k.iconBg} rounded-lg flex items-center justify-center`}>
              <span className={`${k.iconColor} text-xl`}>{k.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}




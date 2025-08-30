export function DecisionFactors({ rationale, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!rationale || !rationale.criteria) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Decision Factors</h4>
        <p className="text-gray-500 text-sm">No decision criteria available</p>
      </div>
    )
  }

  const factors = Object.entries(rationale.criteria).map(([key, value]) => ({
    label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    color: 'bg-blue-500',
    width: `${value * 100}%`,
    pct: `${Math.round(value * 100)}%`
  }))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Decision Factors</h4>
      <div className="space-y-4">
        {factors.map((f) => (
          <div key={f.label}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{f.label}</span>
              <span className="font-medium">{f.pct}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`${f.color} h-2 rounded-full`} style={{ width: f.width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AiConfidence() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Confidence</h4>
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
        <div className="text-sm text-gray-600 mb-4">Overall Confidence Score</div>
        <div className="bg-gray-200 rounded-full h-3 mb-3">
          <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{ width: '92%' }} />
        </div>
        <p className="text-xs text-gray-600">High confidence based on comprehensive data analysis and historical patterns</p>
      </div>
    </div>
  )
}

export function RiskAssessment() {
  const risks = [
    { label: 'Financial Risk', level: 'Low', badge: 'bg-green-100 text-green-800' },
    { label: 'Execution Risk', level: 'Medium', badge: 'bg-yellow-100 text-yellow-800' },
    { label: 'Political Risk', level: 'Low', badge: 'bg-green-100 text-green-800' },
    { label: 'Environmental Risk', level: 'Low', badge: 'bg-green-100 text-green-800' },
  ]
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h4>
      <div className="space-y-3">
        {risks.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{r.label}</span>
            <span className={`${r.badge} px-2 py-1 rounded text-xs`}>{r.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}




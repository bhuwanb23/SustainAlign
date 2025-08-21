export default function Step7AiInputs({ optimizeFor, setOptimizeFor, riskAppetite, setRiskAppetite, alignmentMode, setAlignmentMode }) {
  const METRICS = ['Impact', 'Budget efficiency', 'Long-term sustainability', 'Employee volunteering']
  const toggle = (m) => setOptimizeFor(optimizeFor.includes(m) ? optimizeFor.filter((x) => x !== m) : [...optimizeFor, m])
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">AI Personalization Inputs (Optional)</h3>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Key Metrics to Optimize</label>
        <div className="flex items-center gap-3 flex-wrap">
          {METRICS.map((m) => (
            <label key={m} className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${optimizeFor.includes(m) ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-gray-300 text-gray-700'}`}>
              <input type="checkbox" className="hidden" checked={optimizeFor.includes(m)} onChange={() => toggle(m)} />
              {m}
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Risk Appetite</label>
          <select className="w-full rounded-lg border border-gray-300 px-3 py-2" value={riskAppetite} onChange={(e) => setRiskAppetite(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Alignment Mode</label>
          <select className="w-full rounded-lg border border-gray-300 px-3 py-2" value={alignmentMode} onChange={(e) => setAlignmentMode(e.target.value)}>
            <option>Strict compliance</option>
            <option>Flexible innovation</option>
          </select>
        </div>
      </div>
    </div>
  )
}



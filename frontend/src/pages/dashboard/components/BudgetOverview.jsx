export default function BudgetOverview({ budget }) {
  const { total, utilizedPct, remaining } = budget
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm">Total CSR Budget</div>
        <div className="text-3xl font-extrabold text-gray-900 mt-1">₹ {total.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mt-1">Annual allocation</div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Utilized</div>
            <div className="text-3xl font-extrabold text-gray-900">{utilizedPct}%</div>
          </div>
          <div className="text-emerald-700 text-sm">On track</div>
        </div>
        <div className="mt-3 w-full bg-gray-100 rounded-full h-2"><div className="bg-emerald-600 h-2 rounded-full" style={{width: `${utilizedPct}%`}}></div></div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm">Remaining</div>
        <div className="text-3xl font-extrabold text-gray-900 mt-1">₹ {remaining.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mt-1">Available to deploy</div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm mb-2">Sectoral Breakdown</div>
        <div className="text-sm text-gray-700">[Donut Chart Placeholder]</div>
        <div className="text-xs text-gray-500 mt-2">Education · Health · Environment · Community</div>
      </div>
    </div>
  )
}



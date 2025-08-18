export default function BudgetOverview({ budget }) {
  const { total, utilizedPct, remaining } = budget
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="text-gray-600 text-sm">Total CSR Budget</div>
        <div className="text-2xl font-extrabold text-gray-900">₹ {total.toLocaleString()}</div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="text-gray-600 text-sm">Utilized</div>
        <div className="text-2xl font-extrabold text-gray-900">{utilizedPct}%</div>
        <div className="mt-2 w-full bg-gray-100 rounded-full h-2"><div className="bg-emerald-600 h-2 rounded-full" style={{width: `${utilizedPct}%`}}></div></div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="text-gray-600 text-sm">Remaining</div>
        <div className="text-2xl font-extrabold text-gray-900">₹ {remaining.toLocaleString()}</div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="text-gray-600 text-sm mb-2">Sectoral Breakdown</div>
        <div className="text-sm text-gray-700">[Donut Chart Placeholder]</div>
      </div>
    </div>
  )
}



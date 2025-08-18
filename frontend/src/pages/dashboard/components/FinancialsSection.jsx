export default function FinancialsSection({ allocationData, trendData, breakdown }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl border shadow p-6 lg:col-span-2">
        <div className="text-gray-600 text-sm mb-2">Budget Allocation vs Utilization</div>
        <div className="h-56 flex items-center justify-center text-gray-500">[Sector Bar/Donut Chart]</div>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm mb-2">CSR Spend Trend (12 months)</div>
        <div className="h-56 flex items-center justify-center text-gray-500">[Trendline Chart]</div>
      </div>

      <div className="bg-white rounded-2xl border shadow p-6 lg:col-span-3">
        <div className="text-gray-900 font-semibold mb-3">Project Budget Breakdown</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Project</th>
                <th className="p-2">Allocated</th>
                <th className="p-2">Spent</th>
                <th className="p-2">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((r, i) => (
                <tr key={i} className="odd:bg-gray-50">
                  <td className="p-2">{r.project}</td>
                  <td className="p-2">₹ {r.allocated.toLocaleString()}</td>
                  <td className="p-2">₹ {r.spent.toLocaleString()}</td>
                  <td className="p-2">{Math.round((r.spent/r.allocated)*100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



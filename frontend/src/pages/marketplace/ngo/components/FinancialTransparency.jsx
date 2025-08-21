export default function FinancialTransparency({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Transparency</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4">Fund Allocation (2023)</h4>
          <div className="space-y-4">
            {data.allocation.map((a) => (
              <div key={a.label} className="flex items-center justify-between">
                <span className="text-gray-600">{a.label}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className={`${a.color} h-2 rounded-full`} style={{ width: `${a.value}%` }} />
                  </div>
                  <span className="font-semibold">{a.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4">External Audits</h4>
          <div className="space-y-3">
            {data.audits.map((r) => (
              <div key={r.title} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{r.title}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{r.badge}</span>
                </div>
                <p className="text-sm text-gray-600">Independent financial audit with clean opinion</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



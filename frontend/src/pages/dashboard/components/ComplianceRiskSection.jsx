export default function ComplianceRiskSection({ notifications, riskLevel }) {
  const color = riskLevel==='Low'?'text-emerald-700':'Medium'?'text-yellow-700':'text-red-700'
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-900 font-semibold mb-3">Compliance & Risk Alerts</div>
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
              <div className="text-gray-800">{n}</div>
              <span className="text-xs px-2 py-0.5 bg-white border rounded">Alert</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm">Risk Meter</div>
        <div className={`mt-3 text-2xl font-extrabold ${color}`}>{riskLevel} Risk</div>
        <div className="mt-2 w-full bg-gray-100 rounded-full h-2"><div className={`h-2 rounded-full ${riskLevel==='Low'?'bg-emerald-600':riskLevel==='Medium'?'bg-yellow-500':'bg-red-500'}`} style={{width: riskLevel==='Low'? '25%': riskLevel==='Medium'? '60%':'85%'}}></div></div>
      </div>
    </div>
  )
}



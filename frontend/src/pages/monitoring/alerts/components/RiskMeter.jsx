export default function RiskMeter({ percent }) {
  const colorStop = percent < 30 ? '#22c55e' : percent < 60 ? '#f97316' : '#ef4444'
  const dash = 314 - (314 * percent) / 100
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Portfolio Risk Overview</h2>
        <div className="text-sm text-gray-500">Overall Risk Level</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-64 h-64 relative">
          <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="60%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" stroke="#f3f4f6" strokeWidth="8" fill="none" />
            <circle cx="60" cy="60" r="50" stroke="url(#riskGrad)" strokeWidth="8" fill="none" strokeDasharray="314" strokeDashoffset={dash} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{Math.round(percent)}%</div>
              <div className="text-xs text-gray-500">{percent < 30 ? 'Low Risk' : percent < 60 ? 'Medium Risk' : 'High Risk'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



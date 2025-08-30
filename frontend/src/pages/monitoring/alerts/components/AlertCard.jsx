export default function AlertCard({ alert }) {
  const cfg = {
    critical: { border: 'border-red-200', dot: 'bg-red-500', badge: 'text-red-600', iconBg: 'bg-red-100', pulse: 'pulse-critical' },
    medium: { border: 'border-orange-200', dot: 'bg-orange-500', badge: 'text-orange-600', iconBg: 'bg-orange-100', pulse: 'glow-orange' },
    low: { border: 'border-green-200', dot: 'bg-green-500', badge: 'text-green-600', iconBg: 'bg-green-100', pulse: 'glow-green' },
  }[alert.severity]

  const isRiskBased = alert.source === 'risk-analysis'
  
  return (
    <div className={`bg-white rounded-xl border-2 ${cfg.border} ${cfg.pulse}`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 ${cfg.dot} rounded-full`} />
            <span className={`text-xs font-semibold ${cfg.badge} uppercase tracking-wide`}>
              {alert.severity === 'critical' ? 'Critical' : alert.severity === 'medium' ? 'Medium' : 'Low'}
            </span>
            {isRiskBased && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Risk-Based
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">{alert.minutesAgo} mins ago</div>
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-10 h-10 ${cfg.iconBg} rounded-lg flex items-center justify-center`}>{alert.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
            <p className="text-sm text-gray-600">{alert.project}</p>
            {alert.company && (
              <p className="text-xs text-gray-500">{alert.company}</p>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4">{alert.description}</p>
        
        {/* Risk Score Display for Risk-Based Alerts */}
        {isRiskBased && alert.riskScore && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Risk Score:</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      alert.riskScore >= 80 ? 'bg-red-500' :
                      alert.riskScore >= 60 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${alert.riskScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">{alert.riskScore}%</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <button className={`px-3 py-1 ${alert.severity === 'critical' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white text-xs rounded-lg transition-colors`}>
            {alert.severity === 'critical' ? '⬆️ ' : '✅ '}{alert.actionPrimary}
          </button>
          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}



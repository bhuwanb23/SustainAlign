const riskPill = (level) => level === 'Low' ? 'text-risk-low bg-green-50' : level === 'Medium' ? 'text-risk-medium bg-yellow-50' : 'text-risk-high bg-red-50'

export function Sidebar({ query, setQuery, riskFilter, setRiskFilter, companies, onSelect }) {
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
              placeholder="Search companies..."
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
        {companies.map((company) => (
          <button
            key={company.company_id}
            onClick={() => onSelect(company.company_id)}
            className={`text-left w-full bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 ${company.risk_level === 'Low' ? 'border-l-risk-low' : company.risk_level === 'Medium' ? 'border-l-risk-medium' : 'border-l-risk-high'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${company.risk_level === 'Low' ? 'bg-risk-low' : company.risk_level === 'Medium' ? 'bg-risk-medium' : 'bg-risk-high'} text-white text-sm`}>🏢</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{company.company_name}</h3>
                  <p className="text-xs text-gray-500">{company.projects?.length || 0} Projects</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${riskPill(company.risk_level)}`}>{company.risk_level} Risk</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Risk Score</span>
                <span className="font-medium">{company.risk_score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className={`${company.risk_level === 'Low' ? 'bg-risk-low' : company.risk_level === 'Medium' ? 'bg-risk-medium' : 'bg-risk-high'} h-1 rounded-full`} style={{ width: `${company.risk_score}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹{(company.total_investment / 100000).toFixed(1)}L</span>
                <span>{company.unusual_activities?.length || 0} Alerts</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function HeadlineMetrics({ summary, dailyAnalysis }) {
  const items = [
    { 
      label: 'Total Projects', 
      value: summary.total_projects, 
      iconBg: 'bg-blue-100', 
      iconColor: 'text-blue-600', 
      icon: '📊',
      subtitle: 'Monitored'
    },
    { 
      label: 'Low Risk', 
      value: summary.low_risk, 
      iconBg: 'bg-green-100', 
      iconColor: 'text-risk-low', 
      icon: '🛡️',
      subtitle: 'Projects'
    },
    { 
      label: 'Medium Risk', 
      value: summary.medium_risk, 
      iconBg: 'bg-yellow-100', 
      iconColor: 'text-risk-medium', 
      icon: '⚠️',
      subtitle: 'Projects'
    },
    { 
      label: 'High Risk', 
      value: summary.high_risk, 
      iconBg: 'bg-red-100', 
      iconColor: 'text-risk-high', 
      icon: '❗',
      subtitle: 'Projects'
    },
  ]
  
  return (
    <div className="space-y-6">
      {/* Main metrics */}
      <div className="grid grid-cols-4 gap-6">
        {items.map((k) => (
          <div key={k.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{k.label}</p>
                <p className={`text-2xl font-bold ${k.iconColor === 'text-blue-600' ? 'text-gray-900' : k.iconColor}`}>{k.value}</p>
                <p className="text-xs text-gray-500">{k.subtitle}</p>
              </div>
              <div className={`w-12 h-12 ${k.iconBg} rounded-lg flex items-center justify-center`}>
                <span className={`${k.iconColor} text-xl`}>{k.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Daily analysis summary */}
      {dailyAnalysis && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Analysis - {dailyAnalysis.date}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{dailyAnalysis.new_risks_identified}</p>
              <p className="text-sm text-gray-600">New Risks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{dailyAnalysis.compliance_alerts}</p>
              <p className="text-sm text-gray-600">Compliance Alerts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{dailyAnalysis.budget_alerts}</p>
              <p className="text-sm text-gray-600">Budget Alerts</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Trend:</span> {dailyAnalysis.overall_risk_trend}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function UnusualActivitiesPanel({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Unusual Activities</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">✅</div>
          <p className="text-gray-600">No unusual activities detected</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Unusual Activities</h3>
        <p className="text-sm text-gray-600 mt-1">Recent risk alerts and anomalies</p>
      </div>
      <div className="p-6 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className={`p-4 rounded-lg border-l-4 ${
            activity.severity === 'high' ? 'border-l-red-500 bg-red-50' :
            activity.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
            'border-l-blue-500 bg-blue-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-medium ${
                    activity.severity === 'high' ? 'text-red-700' :
                    activity.severity === 'medium' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {activity.type === 'compliance_alert' ? '🔒' : 
                     activity.type === 'budget_alert' ? '💰' :
                     activity.type === 'low_rating' ? '⭐' :
                     activity.type === 'high_funding' ? '💸' :
                     activity.type === 'long_duration' ? '⏰' : '⚠️'}
                    {activity.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.severity === 'high' ? 'bg-red-100 text-red-700' :
                    activity.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectRiskTable({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Risk Analysis</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-600">No projects to analyze</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Project Risk Analysis</h3>
        <p className="text-sm text-gray-600 mt-1">Detailed risk assessment for each project</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alerts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{project.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{project.ngo_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{(project.investment / 100000).toFixed(1)}L
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div className={`h-2 rounded-full ${
                        project.risk_level === 'Low' ? 'bg-green-500' :
                        project.risk_level === 'Medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} style={{ width: `${project.risk_score}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-900">{project.risk_score}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${riskPill(project.risk_level)}`}>
                    {project.risk_level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.unusual_activities?.length || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}




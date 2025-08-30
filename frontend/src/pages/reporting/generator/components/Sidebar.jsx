export default function Sidebar({ metrics, toggleMetric, period, periodOptions, selectPeriod, onGenerate, isGenerating }) {
  const metricCategories = [
    {
      title: "Environmental Metrics",
      items: [
        { key: 'carbonFootprint', label: 'Carbon Footprint', icon: '🌱', color: 'text-green-600' },
        { key: 'waterUsage', label: 'Water Usage', icon: '💧', color: 'text-blue-600' },
        { key: 'wasteManagement', label: 'Waste Management', icon: '♻️', color: 'text-purple-600' },
        { key: 'energyEfficiency', label: 'Energy Efficiency', icon: '⚡', color: 'text-orange-600' },
      ]
    },
    {
      title: "Social Metrics",
      items: [
        { key: 'socialImpact', label: 'Social Impact', icon: '🤝', color: 'text-red-600' },
        { key: 'stakeholderEngagement', label: 'Stakeholder Engagement', icon: '👥', color: 'text-pink-600' },
        { key: 'communityOutreach', label: 'Community Outreach', icon: '🏘️', color: 'text-indigo-600' },
      ]
    },
    {
      title: "Governance & Compliance",
      items: [
        { key: 'governanceScore', label: 'Governance Score', icon: '🛡️', color: 'text-indigo-600' },
        { key: 'complianceStatus', label: 'Compliance Status', icon: '✅', color: 'text-green-600' },
        { key: 'riskAssessment', label: 'Risk Assessment', icon: '⚠️', color: 'text-red-600' },
      ]
    },
    {
      title: "Performance Metrics",
      items: [
        { key: 'financialPerformance', label: 'Financial Performance', icon: '💰', color: 'text-green-600' },
        { key: 'projectProgress', label: 'Project Progress', icon: '📊', color: 'text-blue-600' },
        { key: 'innovationMetrics', label: 'Innovation Metrics', icon: '🚀', color: 'text-purple-600' },
      ]
    }
  ]

  const selectedCount = Object.values(metrics).filter(Boolean).length
  const totalCount = Object.keys(metrics).length

  return (
    <aside className="w-80 bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Report Configuration</h3>
        <p className="text-sm text-gray-600 mt-1">Customize your comprehensive report</p>
      </div>

      {/* Metrics Selection Summary */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-800">Selected Metrics</span>
          <span className="text-sm text-blue-600">{selectedCount}/{totalCount}</span>
        </div>
        <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(selectedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Metrics Categories */}
      <div className="space-y-6">
        {metricCategories.map((category) => (
          <div key={category.title}>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <span className="mr-2">{category.title === "Environmental Metrics" ? "🌍" : 
                category.title === "Social Metrics" ? "👥" : 
                category.title === "Governance & Compliance" ? "🛡️" : "📈"}</span>
              {category.title}
            </h4>
            <div className="space-y-2">
              {category.items.map((item) => (
                <label key={item.key} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                    checked={!!metrics[item.key]} 
                    onChange={() => toggleMetric(item.key)}
                    disabled={isGenerating}
                  />
                  <span className="text-lg">{item.icon}</span>
                  <span className={`text-sm text-gray-700 ${item.color}`}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex space-x-2">
          <button 
            className="flex-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            onClick={() => {
              Object.keys(metrics).forEach(key => {
                if (!metrics[key]) toggleMetric(key)
              })
            }}
            disabled={isGenerating}
          >
            Select All
          </button>
          <button 
            className="flex-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            onClick={() => {
              Object.keys(metrics).forEach(key => {
                if (metrics[key]) toggleMetric(key)
              })
            }}
            disabled={isGenerating}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Reporting Period */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <span className="mr-2">📅</span>
          Reporting Period
        </h4>
        <select 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white" 
          value={period} 
          onChange={(e) => selectPeriod(e.target.value)}
          disabled={isGenerating}
        >
          {periodOptions.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <button 
        className={`w-full mt-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isGenerating 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`} 
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Generating Comprehensive Report...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="mr-2">✨</span>
            Generate Comprehensive Report
          </div>
        )}
      </button>

      {/* Report Info */}
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center text-sm text-green-700">
          <span className="mr-2">ℹ️</span>
          <span>Report will include {selectedCount} metrics across all selected categories</span>
        </div>
      </div>
    </aside>
  )
}



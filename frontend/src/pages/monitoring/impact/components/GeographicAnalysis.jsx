import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GeographicAnalysis({ analysisResults, loading }) {
  const [activeView, setActiveView] = useState('clusters')

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!analysisResults?.geographicDistribution) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-500 text-center">No geographic data available</p>
      </div>
    )
  }

  const { clusters, totalRegions, averageImpact, impactVariance } = analysisResults.geographicDistribution

  const views = [
    { id: 'clusters', label: 'Impact Clusters', icon: '🗺️' },
    { id: 'density', label: 'Impact Density', icon: '📊' },
    { id: 'performance', label: 'Regional Performance', icon: '🏆' }
  ]

  const renderClusters = () => (
    <div className="space-y-6">
      {/* Cluster Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">{clusters.high.length}</div>
              <div className="text-sm text-green-600">High Impact</div>
            </div>
            <div className="text-2xl">🚀</div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-800">{clusters.medium.length}</div>
              <div className="text-sm text-yellow-600">Medium Impact</div>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-800">{clusters.low.length}</div>
              <div className="text-sm text-red-600">Low Impact</div>
            </div>
            <div className="text-2xl">📉</div>
          </div>
        </div>
      </div>

      {/* Cluster Details */}
      <div className="space-y-4">
        {/* High Impact Regions */}
        <div className="bg-white border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <span className="mr-2">🚀</span>
            High Impact Regions ({clusters.high.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clusters.high.map((region, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded p-3">
                <div className="font-medium text-green-800">{region.name}</div>
                <div className="text-sm text-green-600">
                  Impact: {region.impact.toLocaleString()}
                </div>
                <div className="text-xs text-green-500">
                  Density: {(region.impactDensity * 1000).toFixed(2)} per 1K people
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Impact Regions */}
        <div className="bg-white border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
            <span className="mr-2">📈</span>
            Medium Impact Regions ({clusters.medium.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clusters.medium.map((region, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <div className="font-medium text-yellow-800">{region.name}</div>
                <div className="text-sm text-yellow-600">
                  Impact: {region.impact.toLocaleString()}
                </div>
                <div className="text-xs text-yellow-500">
                  Density: {(region.impactDensity * 1000).toFixed(2)} per 1K people
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Impact Regions */}
        <div className="bg-white border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center">
            <span className="mr-2">📉</span>
            Low Impact Regions ({clusters.low.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clusters.low.map((region, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded p-3">
                <div className="font-medium text-red-800">{region.name}</div>
                <div className="text-sm text-red-600">
                  Impact: {region.impact.toLocaleString()}
                </div>
                <div className="text-xs text-red-500">
                  Density: {(region.impactDensity * 1000).toFixed(2)} per 1K people
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderDensity = () => {
    // Combine all regions and sort by impact density
    const allRegions = [
      ...clusters.high.map(r => ({ ...r, cluster: 'high' })),
      ...clusters.medium.map(r => ({ ...r, cluster: 'medium' })),
      ...clusters.low.map(r => ({ ...r, cluster: 'low' }))
    ].sort((a, b) => b.impactDensity - a.impactDensity)

    return (
      <div className="space-y-6">
        {/* Density Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{totalRegions}</div>
              <div className="text-sm text-blue-600">Total Regions</div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">
                {averageImpact.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">Avg Impact</div>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-800">
                {impactVariance.toLocaleString()}
              </div>
              <div className="text-sm text-indigo-600">Variance</div>
            </div>
          </div>
        </div>

        {/* Density Ranking */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Impact Density Ranking</h4>
          <div className="space-y-3">
            {allRegions.slice(0, 10).map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    region.cluster === 'high' ? 'bg-green-500' :
                    region.cluster === 'medium' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{region.name}</div>
                    <div className="text-sm text-gray-500">
                      {region.projects} projects • {region.population.toLocaleString()} people
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {(region.impactDensity * 1000).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">per 1K people</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderPerformance = () => {
    // Calculate performance metrics for each region
    const allRegions = [
      ...clusters.high.map(r => ({ ...r, cluster: 'high' })),
      ...clusters.medium.map(r => ({ ...r, cluster: 'medium' })),
      ...clusters.low.map(r => ({ ...r, cluster: 'low' }))
    ]

    const performanceData = allRegions.map(region => ({
      ...region,
      efficiency: region.impact / region.projects,
      coverage: region.projects / (region.population / 1000000), // projects per million people
      performance: (region.impactDensity * 1000) * (region.projects / Math.max(region.population / 1000000, 1))
    }))

    return (
      <div className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Top Performers by Efficiency</h4>
            <div className="space-y-2">
              {performanceData
                .sort((a, b) => b.efficiency - a.efficiency)
                .slice(0, 5)
                .map((region, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-700">{region.name}</span>
                    <span className="text-sm text-gray-600">
                      {region.efficiency.toLocaleString()}/project
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Top Performers by Coverage</h4>
            <div className="space-y-2">
              {performanceData
                .sort((a, b) => b.coverage - a.coverage)
                .slice(0, 5)
                .map((region, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-700">{region.name}</span>
                    <span className="text-sm text-gray-600">
                      {region.coverage.toFixed(1)} projects/M
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Performance Heatmap */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Performance Heatmap</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {performanceData
              .sort((a, b) => b.performance - a.performance)
              .map((region, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  region.cluster === 'high' ? 'bg-green-50 border-green-200' :
                  region.cluster === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="font-medium text-gray-900">{region.name}</div>
                  <div className="text-sm text-gray-600">
                    Performance: {region.performance.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Efficiency: {region.efficiency.toLocaleString()}/project
                  </div>
                  <div className="text-xs text-gray-500">
                    Coverage: {region.coverage.toFixed(1)} projects/M
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeView) {
      case 'clusters': return renderClusters()
      case 'density': return renderDensity()
      case 'performance': return renderPerformance()
      default: return renderClusters()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      {/* View Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Views">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeView === view.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{view.icon}</span>
              <span>{view.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </motion.div>
  )
}

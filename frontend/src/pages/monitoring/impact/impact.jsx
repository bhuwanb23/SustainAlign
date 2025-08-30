import Header from './components/Header.jsx'
import OverviewCards from './components/OverviewCards.jsx'
import ImpactTrends from './components/ImpactTrends.jsx'
import RenewableEnergy from './components/RenewableEnergy.jsx'
import WasteReduction from './components/WasteReduction.jsx'
import RegionalMap from './components/RegionalMap.jsx'
import SustainabilityKpis from './components/SustainabilityKpis.jsx'
import MonthlyGoals from './components/MonthlyGoals.jsx'
import ImpactHeatmap from './components/ImpactHeatmap.jsx'
import AdvancedAnalytics from './components/AdvancedAnalytics.jsx'
import GeographicAnalysis from './components/GeographicAnalysis.jsx'
import useImpact from './hooks/useImpact.js'

export default function ImpactDashboardPage() {
  const { snapshot, timeSeries, regionStats, goals, loading, error, refreshData, analysisResults, projects } = useImpact()

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
      <Header />
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">⚠️</span>
            <span className="text-red-800">Error loading impact data: {error}</span>
            <button 
              onClick={refreshData}
              className="ml-auto px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Project Tracker Integration Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Real-Time Project Impact Analysis</h3>
              <p className="text-sm text-gray-600">
                Powered by {projects.length} active projects from your project tracker
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-sm text-gray-600">Projects Analyzed</div>
          </div>
        </div>
      </div>
      
      <OverviewCards snapshot={snapshot} loading={loading} />

      {/* Advanced Analytics Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics & AI Insights</h2>
          <div className="text-sm text-gray-500">
            Based on real project data from tracker
          </div>
        </div>
        
        <AdvancedAnalytics analysisResults={analysisResults} loading={loading} />
      </div>

      {/* Geographic Analysis Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Geographic Impact Analysis</h2>
          <div className="text-sm text-gray-500">
            Regional clustering from project locations
          </div>
        </div>
        
        <GeographicAnalysis analysisResults={analysisResults} loading={loading} />
      </div>

      {/* Project Status Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {projects.filter(p => p.status === 'on-track' || p.status === 'funded' || p.status === 'published').length}
              </div>
              <div className="text-sm text-green-600">Active Projects</div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-blue-600">Completed</div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {projects.filter(p => p.status === 'delayed').length}
              </div>
              <div className="text-sm text-yellow-600">Delayed</div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${(projects.reduce((sum, p) => sum + (p.budget || 0), 0) / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-purple-600">Total Budget</div>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional Dashboard Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ImpactTrends timeSeries={timeSeries} loading={loading} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RenewableEnergy />
            <WasteReduction />
          </div>
        </div>
        <RegionalMap />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SustainabilityKpis />
        <div className="space-y-6">
          <MonthlyGoals goals={goals} loading={loading} />
          <ImpactHeatmap />
        </div>
      </div>

      {/* Algorithm Performance Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithm Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analysisResults?.trends ? Object.keys(analysisResults.trends).length : 0}
              </div>
              <div className="text-sm text-gray-600">Metrics Analyzed</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {analysisResults?.anomalies ? 
                  Object.values(analysisResults.anomalies).reduce((total, anomalies) => total + anomalies.length, 0) : 0}
              </div>
              <div className="text-sm text-gray-600">Anomalies Detected</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {analysisResults?.predictions ? Object.keys(analysisResults.predictions).length : 0}
              </div>
              <div className="text-sm text-gray-600">Predictions Generated</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {analysisResults?.impactScore?.grade?.grade || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Impact Grade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Source Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>📊</span>
          <span>Data Source: Project Tracker • Last Updated: {new Date().toLocaleString()}</span>
          <button 
            onClick={refreshData}
            className="ml-auto px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}



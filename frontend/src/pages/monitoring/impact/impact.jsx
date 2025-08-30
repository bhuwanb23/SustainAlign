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
  const { snapshot, timeSeries, regionStats, goals, loading, error, refreshData, analysisResults } = useImpact()

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
      
      <OverviewCards snapshot={snapshot} loading={loading} />

      {/* Advanced Analytics Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics & AI Insights</h2>
          <div className="text-sm text-gray-500">
            Powered by sophisticated algorithms and machine learning
          </div>
        </div>
        
        <AdvancedAnalytics analysisResults={analysisResults} loading={loading} />
      </div>

      {/* Geographic Analysis Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Geographic Impact Analysis</h2>
          <div className="text-sm text-gray-500">
            Regional clustering and performance analysis
          </div>
        </div>
        
        <GeographicAnalysis analysisResults={analysisResults} loading={loading} />
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
    </div>
  )
}



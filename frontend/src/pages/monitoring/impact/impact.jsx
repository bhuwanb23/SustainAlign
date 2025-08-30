import Header from './components/Header.jsx'
import OverviewCards from './components/OverviewCards.jsx'
import ImpactTrends from './components/ImpactTrends.jsx'
import RenewableEnergy from './components/RenewableEnergy.jsx'
import WasteReduction from './components/WasteReduction.jsx'
import RegionalMap from './components/RegionalMap.jsx'
import SustainabilityKpis from './components/SustainabilityKpis.jsx'
import MonthlyGoals from './components/MonthlyGoals.jsx'
import ImpactHeatmap from './components/ImpactHeatmap.jsx'
import useImpact from './hooks/useImpact.js'

export default function ImpactDashboardPage() {
  const { snapshot, timeSeries, regionStats, goals, loading, error, refreshData } = useImpact()

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
    </div>
  )
}



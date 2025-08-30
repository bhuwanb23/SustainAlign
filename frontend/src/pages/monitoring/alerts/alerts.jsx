import useAlerts from './hooks/useAlerts.js'
import HeaderBar from './components/HeaderBar.jsx'
import RiskMeter from './components/RiskMeter.jsx'
import FiltersBar from './components/FiltersBar.jsx'
import AlertsGrid from './components/AlertsGrid.jsx'

export default function MonitoringAlertsPage() {
  const {
    filterRisk,
    setFilterRisk,
    filterProject,
    setFilterProject,
    sort,
    setSort,
    lastUpdated,
    riskPercent,
    alerts,
    totalCount,
    allProjects,
    onRefresh,
    riskAlerts,
    overallRiskScore,
    showRiskAlerts,
    setShowRiskAlerts
  } = useAlerts()

  // Combine regular alerts with risk-based alerts
  const allAlerts = showRiskAlerts ? [...riskAlerts, ...alerts] : alerts
  const totalAlertsCount = allAlerts.length

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBar lastUpdated={lastUpdated} />
      <main className="p-6 space-y-6">
        {/* Risk Overview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Risk Overview</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showRiskAlerts}
                  onChange={(e) => setShowRiskAlerts(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Include Risk-Based Alerts</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <RiskMeter percent={overallRiskScore} />
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalAlertsCount}</div>
                  <div className="text-sm text-gray-600">Total Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {allAlerts.filter(a => a.severity === 'critical').length}
                  </div>
                  <div className="text-sm text-gray-600">Critical</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {allAlerts.filter(a => a.severity === 'medium').length}
                  </div>
                  <div className="text-sm text-gray-600">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {allAlerts.filter(a => a.severity === 'low').length}
                  </div>
                  <div className="text-sm text-gray-600">Low</div>
                </div>
              </div>
              
              {showRiskAlerts && riskAlerts.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <span>📊</span>
                    <span>
                      {riskAlerts.length} risk-based alerts from corporate projects included
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <FiltersBar
          filterRisk={filterRisk}
          setFilterRisk={setFilterRisk}
          filterProject={filterProject}
          setFilterProject={setFilterProject}
          sort={sort}
          setSort={setSort}
          totalCount={totalAlertsCount}
          onRefresh={onRefresh}
          allProjects={allProjects}
        />
        
        {totalAlertsCount > 0 ? (
          <AlertsGrid alerts={allAlerts} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Alerts</h3>
            <p className="text-gray-600">
              {showRiskAlerts 
                ? "All projects are currently within acceptable risk parameters and no operational alerts are active."
                : "No operational alerts are currently active."
              }
            </p>
            {!showRiskAlerts && (
              <button
                onClick={() => setShowRiskAlerts(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Include Risk-Based Alerts
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}



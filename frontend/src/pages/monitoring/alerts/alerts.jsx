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
  } = useAlerts()

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBar lastUpdated={lastUpdated} />
      <main className="p-6 space-y-6">
        <RiskMeter percent={riskPercent} />
        <FiltersBar
          filterRisk={filterRisk}
          setFilterRisk={setFilterRisk}
          filterProject={filterProject}
          setFilterProject={setFilterProject}
          sort={sort}
          setSort={setSort}
          totalCount={totalCount}
          onRefresh={onRefresh}
          allProjects={allProjects}
        />
        <AlertsGrid alerts={alerts} />
      </main>
    </div>
  )
}



import HeaderBar from './components/HeaderBar.jsx'
import FilterSection from './components/FilterSection.jsx'
import Timeline from './components/Timeline.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import useAuditTrail from './hooks/useAuditTrail.js'

export default function AuditTrailPage() {
  const {
    query, setQuery,
    typeFilter, setTypeFilter,
    statusFilter, setStatusFilter,
    dateFilter, setDateFilter,
    entries, details, expandedId, toggle,
    summary,
    loading,
    error,
    onExport,
    onAddEntry,
    refreshData,
  } = useAuditTrail()

  if (error) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4">Error loading audit trail</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={refreshData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 min-h-screen">
      <HeaderBar onExport={onExport} onAdd={onAddEntry} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <FilterSection
          query={query}
          setQuery={setQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-gray-600">Loading audit trail...</div>
          </div>
        ) : (
          <>
            <Timeline
              entries={entries}
              details={details}
              expandedId={expandedId}
              toggle={toggle}
            />
            <SummaryCards summary={summary} />
          </>
        )}
      </main>
    </div>
  )
}



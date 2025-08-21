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
    onExport,
    onAddEntry,
  } = useAuditTrail()

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
        <Timeline
          entries={entries}
          details={details}
          expandedId={expandedId}
          toggle={toggle}
        />
        <SummaryCards summary={summary} />
      </main>
    </div>
  )
}



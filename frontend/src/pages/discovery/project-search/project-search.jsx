import useProjectSearch from './hooks/useProjectSearch.js'
import DiscoveryHeader from './components/DiscoveryHeader.jsx'
import SearchSection from './components/SearchSection.jsx'
import FiltersSidebar from './components/FiltersSidebar.jsx'
import ResultToolbar from './components/ResultToolbar.jsx'
import DiscoveryCard from './components/DiscoveryCard.jsx'
import Pagination from './components/Pagination.jsx'

export default function ProjectSearchPage() {
  const {
    // options
    regionOptions,
    sdgOptions,
    budgetOptions,
    timelineOptions,
    // state
    query,
    setQuery,
    advanced,
    setAdvancedFilter,
    impactAreas,
    toggleImpactArea,
    sort,
    setSort,
    view,
    setView,
    // data
    results,
    totalCount,
  } = useProjectSearch()

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 min-h-screen">
      <DiscoveryHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <SearchSection
          query={query}
          setQuery={setQuery}
          regionOptions={regionOptions}
          sdgOptions={sdgOptions}
          budgetOptions={budgetOptions}
          timelineOptions={timelineOptions}
          advanced={advanced}
          setAdvancedFilter={setAdvancedFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FiltersSidebar impactAreas={impactAreas} toggleImpactArea={toggleImpactArea} view={view} setView={setView} />

          <section className="lg:col-span-3">
            <ResultToolbar totalCount={totalCount} visibleCount={results.length} sort={sort} setSort={setSort} />

            <div className="space-y-6">
              {results.map((p) => (
                <DiscoveryCard key={p.id} project={p} />
              ))}
            </div>

            <Pagination />
          </section>
        </div>
      </main>
    </div>
  )
}



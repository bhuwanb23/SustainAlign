import SearchBar from './components/SearchBar.jsx'
import Filters from './components/Filters.jsx'
import useProjectSearch from './hooks/useProjectSearch.js'
import ProjectCard from '../project-cards/components/ProjectCard.jsx'

export default function ProjectSearchPage() {
  const { query, setQuery, filters, setFilter, results } = useProjectSearch()
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-sky-600 text-transparent bg-clip-text">Project Discovery</h1>
        <p className="text-gray-600 mt-1">Search projects from NGO portals and SDG datasets.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <Filters filters={filters} setFilter={setFilter} />
          </div>
        </aside>
        <main className="lg:col-span-3 space-y-4">
          <SearchBar value={query} onChange={setQuery} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}



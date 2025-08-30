import { useState } from 'react'
import useTracker from './hooks/useTracker.js'
import HeaderBar from './components/HeaderBar.jsx'
import FiltersBar from './components/FiltersBar.jsx'
import TimelineOverview from './components/TimelineOverview.jsx'
import ProjectCard from './components/ProjectCard.jsx'
import ProjectDetails from './components/ProjectDetails.jsx'

export default function ProjectTrackerPage() {
  const { filter, setFilter, projects, timeline, loading, error, refreshData } = useTracker()
  const [active, setActive] = useState(null)

  // Calculate counts for header
  const totalCount = projects.length
  const approvedCount = projects.filter(p => p.status === 'funded' || p.status === 'published').length

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-4">Error loading tracker data</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBar 
        onNew={() => {}} 
        projectCount={totalCount}
        approvedCount={approvedCount}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <FiltersBar filter={filter} setFilter={setFilter} />
        <TimelineOverview timeline={timeline} />
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="mt-4 text-gray-600">Loading projects...</div>
          </div>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onView={setActive} />
            ))}
          </section>
        )}
      </main>
      {active && <ProjectDetails project={active} onClose={() => setActive(null)} />}
    </div>
  )
}



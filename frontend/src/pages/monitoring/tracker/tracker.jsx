import useTracker from './hooks/useTracker.js'
import HeaderBar from './components/HeaderBar.jsx'
import FiltersBar from './components/FiltersBar.jsx'
import TimelineOverview from './components/TimelineOverview.jsx'
import ProjectCard from './components/ProjectCard.jsx'

export default function ProjectTrackerPage() {
  const { filter, setFilter, projects, timeline } = useTracker()

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBar onNew={() => {}} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <FiltersBar filter={filter} setFilter={setFilter} />
        <TimelineOverview timeline={timeline} />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>
      </main>
    </div>
  )
}



import ProjectCard from './components/ProjectCard.jsx'
import useProjectCards from './hooks/useProjectCards.js'

export default function ProjectCardsPage() {
  const { projects } = useProjectCards()
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 text-transparent bg-clip-text">Project Cards</h1>
        <p className="text-gray-600 mt-1">Reusable project cards for discovery and alignment.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}



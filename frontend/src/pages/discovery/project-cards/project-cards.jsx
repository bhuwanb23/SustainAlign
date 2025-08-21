import ProjectCard from './components/ProjectCard.jsx'
import useProjectCards from './hooks/useProjectCards.js'

export default function ProjectCardsPage() {
  const { projects } = useProjectCards()
  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sustainable Impact Projects</h1>
          <p className="text-gray-600">Discover verified NGO projects making a real difference</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  )
}



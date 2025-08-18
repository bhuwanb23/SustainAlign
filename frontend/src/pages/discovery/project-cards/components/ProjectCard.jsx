export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.ngo}</p>
        </div>
        <span className="text-sm px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">{project.credibility}</span>
      </div>
      <div className="mt-3 text-sm text-gray-700">Impact: {project.impact}</div>
      <div className="mt-2 text-sm text-gray-700">SDG: {project.sdg}</div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-gray-900">${project.budget.toLocaleString()}</span>
        <div className="space-x-2">
          <button className="text-emerald-700 hover:text-emerald-800">View</button>
          <button className="text-sky-700 hover:text-sky-800">Compare</button>
        </div>
      </div>
    </div>
  )
}



const badgeClass = {
  verified: 'badge-verified text-white text-xs px-3 py-1 rounded-full font-medium',
  review: 'badge-review text-white text-xs px-3 py-1 rounded-full font-medium',
}

const ngoColor = {
  green: 'text-green-700',
  blue: 'text-blue-700',
}

const tagClass = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  purple: 'bg-purple-100 text-purple-700',
  red: 'bg-red-100 text-red-700',
}

export default function ProjectCard({ project }) {
  const cardGradient = project.theme === 'blue' ? 'project-card-blue border-blue-100' : 'project-card border-green-100'
  const cBadge = badgeClass[project.status] || badgeClass.verified
  const ngoCls = ngoColor[project.ngo?.color] || 'text-green-700'
  return (
    <div className={`${cardGradient} rounded-2xl p-6 shadow-lg card-hover cursor-pointer border group`}>
      <div className="relative mb-4">
        <img className="w-full h-48 object-cover rounded-xl" src={project.image} alt={project.alt} />
        <div className="absolute top-3 right-3">
          <span className={`${cBadge} flex items-center gap-1`}>{project.status === 'review' ? 'Under Review' : 'Verified'}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className={`text-sm font-medium mb-2 ${ngoCls}`}>{project.ngo?.name}</p>
        <p className="text-sm text-gray-600 mb-3">{project.summary}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs text-gray-500">Budget Needed</span>
            <p className={`text-lg font-bold ${project.theme === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>
              ${project.budgetNeeded.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Credibility</span>
            <p className={`text-sm font-semibold ${project.theme === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>{project.credibility}%</p>
          </div>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
        <div className="flex gap-2">
          <button className={`flex-1 ${project.theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors`}>
            View Details
          </button>
          <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">❤</button>
          <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">⚖️</button>
        </div>
      </div>

      <div className={`flex gap-2 pt-3 border-t ${project.theme === 'blue' ? 'border-blue-100' : 'border-green-100'}`}>
        {project.tags.map((t) => (
          <span key={t.label} className={`${tagClass[t.color] || 'bg-green-100 text-green-700'} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}



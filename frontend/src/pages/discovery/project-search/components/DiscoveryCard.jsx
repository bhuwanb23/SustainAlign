export default function DiscoveryCard({ project }) {
  const badgeBg = 'bg-emerald-100'
  const badgeText = 'text-emerald-700'
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <span className="text-emerald-700 text-lg">{project.icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
            <p className="text-gray-600">{project.ngo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center ${badgeBg} px-3 py-1 rounded-full`}>
            <span className="text-emerald-600 mr-1">⭐</span>
            <span className={`${badgeText} font-medium`}>{project.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{project.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Budget Required</p>
          <p className="font-semibold text-emerald-800">{project.budgetLabel}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-semibold text-gray-900">{project.duration}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-semibold text-gray-900">{project.location}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">SDG</p>
          <p className="font-semibold text-blue-600">{project.sdgNumber}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {project.tags.map((t) => (
            <span key={t} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">{t}</span>
          ))}
        </div>
        <button className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors">
          View Details
        </button>
      </div>
    </div>
  )
}



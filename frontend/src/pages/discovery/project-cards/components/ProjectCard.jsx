import { motion } from 'framer-motion'

export default function ProjectCard({ project, onClick }) {
  const getSdgColor = (sdgName) => {
    const colorMap = {
      'No Poverty': 'bg-red-500',
      'Zero Hunger': 'bg-orange-500',
      'Good Health': 'bg-green-500',
      'Quality Education': 'bg-blue-500',
      'Gender Equality': 'bg-pink-500',
      'Clean Water': 'bg-cyan-500',
      'Clean Energy': 'bg-yellow-500',
      'Decent Work': 'bg-purple-500',
      'Climate Action': 'bg-emerald-500',
      'Life on Land': 'bg-teal-500'
    }
    return colorMap[sdgName] || 'bg-gray-500'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatBudget = (budget) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget)
  }

  return (
    <motion.div
      onClick={() => onClick && onClick(project)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-2xl">
              {project.impactArea === 'Education' ? '📚' :
               project.impactArea === 'Healthcare' ? '🏥' :
               project.impactArea === 'Environment' ? '🌿' :
               project.impactArea === 'Clean Energy' ? '⚡' :
               project.impactArea === 'Water & Sanitation' ? '💧' :
               project.impactArea === 'Women Empowerment' ? '👩‍💼' :
               project.impactArea === 'Agriculture' ? '🌾' :
               '🌍'}
            </span>
          </div>
          <div className="text-xs font-medium text-emerald-700 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
            {project.status === 'pending' ? 'Under Review' : 'Verified'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Organization */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {project.projectName}
          </h3>
          <p className="text-sm text-emerald-600 font-medium">
            {project.organization}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Location and Timeline */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{project.timeline}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Budget Required</div>
          <div className="text-lg font-bold text-emerald-600">
            {formatBudget(project.budget)}
          </div>
        </div>

        {/* SDGs */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Sustainable Development Goals</div>
          <div className="flex flex-wrap gap-1">
            {(project.sdgs || []).slice(0, 3).map((sdg, index) => (
              <span
                key={index}
                className={`${getSdgColor(sdg)} text-white text-xs px-2 py-1 rounded-full`}
              >
                {sdg}
              </span>
            ))}
            {Array.isArray(project.sdgs) && project.sdgs.length > 3 && (
              <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{project.sdgs.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>{project.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <span>❤️</span>
            <span>{project.likes} likes</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onClick && onClick(project)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
          >
            View Details
          </motion.button>
          <motion.button
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-emerald-500 text-emerald-600 text-sm font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200"
          >
            Contact
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}



import { useState } from 'react'

export default function ProjectCard({ project, onClick, onCompare, onApply, comparisonLoading, isInComparison = false }) {
  const [isHovered, setIsHovered] = useState(false)

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return '—'
    if (amount >= 1000000) return `₹${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
    return `₹${amount.toFixed(0)}`
  }

  const formatSDGs = (sdgs) => {
    if (!sdgs || sdgs.length === 0) return '—'
    return sdgs.slice(0, 3).join(', ') + (sdgs.length > 3 ? '...' : '')
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Project Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
        <div className="text-4xl text-emerald-600">🌱</div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Project Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {project.projectName || project.title || 'Untitled Project'}
        </h3>

        {/* Organization */}
        <p className="text-sm text-emerald-600 font-medium mb-3">
          {project.organization || 'NGO Organization'}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description || 'No description available'}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Budget</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(project.budget || project.fundingRequired)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
            <p className="text-sm font-semibold text-gray-900">
              {project.location || 'Not specified'}
            </p>
          </div>
        </div>

        {/* SDG Goals */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">SDG Focus</p>
          <p className="text-sm text-gray-700">
            {formatSDGs(project.sdgs || project.sdg_goals)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCompare(project)
            }}
            disabled={comparisonLoading || isInComparison}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              comparisonLoading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isInComparison
                ? 'bg-emerald-100 text-emerald-600 cursor-not-allowed'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {comparisonLoading 
              ? 'Adding...' 
              : isInComparison 
                ? '✓ In Comparison' 
                : 'Compare'
            }
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onApply(project)
            }}
            className="flex-1 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl pointer-events-none transition-all duration-200" />
      )}
    </div>
  )
}



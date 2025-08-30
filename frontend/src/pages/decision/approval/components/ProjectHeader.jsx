export default function ProjectHeader({ selected }) {
  const title = selected?.projectTitle || selected?.project?.title || 'Select a project'
  
  // Fix data extraction to match the actual structure
  const budget = selected?.project?.financials?.funding_required 
    ? `${selected.project.financials.currency || '₹'} ${selected.project.financials.funding_required}`
    : selected?.project?.budget || '—'
  
  const start = selected?.project?.timeline?.start_date || selected?.project?.start_date || '—'
  const end = selected?.project?.timeline?.end_date || selected?.project?.end_date || '—'
  const location = selected?.project?.location?.city || selected?.project?.location || selected?.project?.region || '—'

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'in_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return '✅'
      case 'rejected': return '❌'
      case 'in_review': return '⏳'
      default: return '📋'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🌱</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">Approval #{selected?.id}</p>
            </div>
            {selected?.status && (
              <div className={`px-3 sm:px-4 py-2 rounded-full border text-sm font-medium flex items-center space-x-2 flex-shrink-0 ${getStatusColor(selected.status)}`}>
                <span>{getStatusIcon(selected.status)}</span>
                <span className="whitespace-nowrap">{selected.status}</span>
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500">💰</span>
                <span className="text-sm font-medium text-gray-700">Budget</span>
              </div>
              <div className="text-lg font-bold text-gray-900 break-words">{budget}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500">📅</span>
                <span className="text-sm font-medium text-gray-700">Timeline</span>
              </div>
              <div className="text-sm text-gray-900">
                {start !== '—' && end !== '—' ? (
                  <>
                    <div className="break-words">{new Date(start).toLocaleDateString()}</div>
                    <div className="text-gray-500 break-words">to {new Date(end).toLocaleDateString()}</div>
                  </>
                ) : (
                  <div>Not specified</div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500">📍</span>
                <span className="text-sm font-medium text-gray-700">Location</span>
              </div>
              <div className="text-sm text-gray-900 break-words">{location}</div>
            </div>
          </div>

          {/* Progress Bar */}
          {selected?.steps && selected.steps.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Approval Progress</span>
                <span className="text-sm text-gray-500">
                  {selected.steps.filter(s => s.status === 'approved').length} of {selected.steps.length} steps completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(selected.steps.filter(s => s.status === 'approved').length / selected.steps.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



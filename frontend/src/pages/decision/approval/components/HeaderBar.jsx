export default function HeaderBar({ selected }) {
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
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-lg sm:text-xl">🌿</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 break-words">Project Approval Hub</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Streamlined decision-making workflow</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            {selected ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="text-right min-w-0">
                  <div className="text-sm font-medium text-gray-900 break-words">
                    {selected.projectTitle || selected.title || 'Project'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Approval #{selected.id}
                  </div>
                </div>
                <div className={`px-2 sm:px-3 py-1 rounded-full border text-xs sm:text-sm font-medium flex items-center space-x-1 flex-shrink-0 ${getStatusColor(selected.status)}`}>
                  <span>{getStatusIcon(selected.status)}</span>
                  <span className="whitespace-nowrap">{selected.status || 'Pending'}</span>
                </div>
              </div>
            ) : (
              <div className="text-right min-w-0">
                <div className="text-sm font-medium text-gray-900">No Project Selected</div>
                <div className="text-xs text-gray-500">Choose from the list</div>
              </div>
            )}
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs sm:text-sm font-medium">JD</span>
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">Approval Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}



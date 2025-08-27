export default function Toolbar({ mode, onMode, selectedCount = 0 }) {
  const isTable = mode === 'table'
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Evaluation Dashboard</h2>
        <p className="text-sm text-gray-500">Compare shortlisted projects by cost, impact, ESG and risk.</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600"><span className="inline-flex items-center justify-center h-6 px-2 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">{selectedCount}</span> Projects Selected</span>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition-colors">
          Export Report
        </button>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onMode('table')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isTable ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Table View
          </button>
          <button
            onClick={() => onMode('charts')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${!isTable ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Visual Graphs
          </button>
        </div>
      </div>
    </div>
  )
}



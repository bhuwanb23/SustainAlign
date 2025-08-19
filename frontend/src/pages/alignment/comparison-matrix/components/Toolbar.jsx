export default function Toolbar({ mode, onMode }) {
  const isTable = mode === 'table'
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Evaluation Dashboard</h2>
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
  )
}



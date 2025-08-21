export default function HeaderBar({ onExport, onAdd }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🛡️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Audit Trail</h1>
              <p className="text-sm text-gray-600">Compliance & Accountability Log</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onExport}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              Export
            </button>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              New Entry
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}



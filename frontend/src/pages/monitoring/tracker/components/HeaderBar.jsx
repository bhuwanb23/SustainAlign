export default function HeaderBar({ onNew }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#4CAF50] to-[#009688] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌿</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Project Tracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onNew}
              className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              ➕ New Project
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}



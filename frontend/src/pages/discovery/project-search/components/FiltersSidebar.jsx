export default function FiltersSidebar({ impactAreas, toggleImpactArea, view, setView }) {
  const IMPACTS = [
    { key: 'Environment', icon: '🌱', color: 'text-emerald-600' },
    { key: 'Education', icon: '🎓', color: 'text-blue-600' },
    { key: 'Healthcare', icon: '❤️', color: 'text-red-500' },
    { key: 'Food Security', icon: '🍽️', color: 'text-orange-600' },
  ]
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg sticky top-32">
        <h3 className="text-lg font-semibold text-emerald-800 mb-4">Filter by Impact Area</h3>
        <div className="space-y-3">
          {IMPACTS.map((i) => (
            <label key={i.key} className="flex items-center space-x-3 cursor-pointer hover:bg-emerald-50 p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                className="rounded border-emerald-300 text-emerald-700 focus:ring-emerald-700"
                checked={!!impactAreas[i.key]}
                onChange={() => toggleImpactArea(i.key)}
              />
              <span className={`${i.color}`}>{i.icon}</span>
              <span className="text-gray-700">{i.key}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-3">View Options</h4>
          <div className="flex space-x-2">
            <button
              className={`flex-1 py-2 px-3 rounded-lg text-sm ${
                view === 'list' ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => setView('list')}
            >
              📋 List
            </button>
            <button
              className={`flex-1 py-2 px-3 rounded-lg text-sm ${
                view === 'map' ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => setView('map')}
            >
              🗺️ Map
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}



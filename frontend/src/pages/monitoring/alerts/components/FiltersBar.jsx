export default function FiltersBar({
  filterRisk,
  setFilterRisk,
  filterProject,
  setFilterProject,
  sort,
  setSort,
  totalCount,
  onRefresh,
  allProjects,
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">🧰</span>
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)}>
          {['All Risk Levels', 'Critical', 'Medium', 'Low'].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={filterProject} onChange={(e) => setFilterProject(e.target.value)}>
          {allProjects.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={sort} onChange={(e) => setSort(e.target.value)}>
          {['Sort by Urgency', 'Most Recent', 'Oldest First'].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <div className="ml-auto flex items-center space-x-2">
          <span className="text-sm text-gray-600">{totalCount} Active Alerts</span>
          <button onClick={onRefresh} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">🔄 Refresh</button>
        </div>
      </div>
    </div>
  )
}



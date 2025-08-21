export default function ResultToolbar({ totalCount, visibleCount, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-600">Showing {visibleCount} of {totalCount} projects</p>
      <select
        className="px-4 py-2 rounded-lg border border-emerald-200 focus:border-emerald-700 focus:outline-none bg-white/80"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option>Relevance</option>
        <option>Budget: Low to High</option>
        <option>Timeline: Shortest</option>
      </select>
    </div>
  )
}



export default function SearchSection({
  query,
  setQuery,
  regionOptions,
  sdgOptions,
  budgetOptions,
  timelineOptions,
  advanced,
  setAdvancedFilter,
}) {
  return (
    <section className="mb-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg">
        <h2 className="text-3xl font-bold text-emerald-800 mb-2">Discover Impactful Projects</h2>
        <p className="text-gray-600 mb-6">Find NGO projects aligned with your CSR goals and sustainability vision</p>

        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name, NGO, or impact area..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-emerald-200 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 bg-white/80"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-700 focus:outline-none bg-white/80"
            value={advanced.region}
            onChange={(e) => setAdvancedFilter('region', e.target.value)}
          >
            {regionOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            className="px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-700 focus:outline-none bg-white/80"
            value={advanced.sdg}
            onChange={(e) => setAdvancedFilter('sdg', e.target.value)}
          >
            {sdgOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            className="px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-700 focus:outline-none bg-white/80"
            value={advanced.budgetRange}
            onChange={(e) => setAdvancedFilter('budgetRange', e.target.value)}
          >
            {budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            className="px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-700 focus:outline-none bg-white/80"
            value={advanced.timeline}
            onChange={(e) => setAdvancedFilter('timeline', e.target.value)}
          >
            {timelineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}



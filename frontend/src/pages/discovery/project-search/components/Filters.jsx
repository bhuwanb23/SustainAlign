export default function Filters({ filters, setFilter }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Filters</h3>
      <div>
        <label className="block text-sm text-gray-600">Sector</label>
        <select className="mt-1 w-full border border-gray-200 rounded-xl p-2"
          value={filters.sector}
          onChange={(e) => setFilter('sector', e.target.value)}
        >
          {['All','Education','Health','Climate','Water','Community'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600">Geography</label>
        <input className="mt-1 w-full border border-gray-200 rounded-xl p-2" placeholder="Country/State/City" value={filters.geo} onChange={(e) => setFilter('geo', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Budget</label>
        <input className="mt-1 w-full border border-gray-200 rounded-xl p-2" type="number" placeholder="Max Budget" value={filters.budget} onChange={(e) => setFilter('budget', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm text-gray-600">SDG</label>
        <select className="mt-1 w-full border border-gray-200 rounded-xl p-2" value={filters.sdg} onChange={(e) => setFilter('sdg', e.target.value)}>
          {['Any','Quality Education','Clean Water and Sanitation','Climate Action'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  )
}



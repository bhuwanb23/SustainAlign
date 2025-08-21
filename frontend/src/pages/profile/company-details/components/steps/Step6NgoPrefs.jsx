export default function Step6NgoPrefs({ ngoSize, setNgoSize, partnershipModel, setPartnershipModel, regions, setRegions }) {
  const REGION_OPTIONS = ['Local','National','Global']
  const toggleRegion = (r) => setRegions(regions.includes(r) ? regions.filter((x) => x !== r) : [...regions, r])
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">NGO Collaboration Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Preferred NGO Size</label>
          <select className="w-full rounded-lg border border-gray-300 px-3 py-2" value={ngoSize} onChange={(e) => setNgoSize(e.target.value)}>
            <option>Grassroot</option>
            <option>Mid-level</option>
            <option>Large International</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Preferred Partnership Model</label>
          <select className="w-full rounded-lg border border-gray-300 px-3 py-2" value={partnershipModel} onChange={(e) => setPartnershipModel(e.target.value)}>
            <option>Funding only</option>
            <option>Funding + Execution</option>
            <option>Joint execution</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 mb-2">Collaboration Regions</label>
          <div className="flex items-center gap-3 flex-wrap">
            {REGION_OPTIONS.map((r) => (
              <label key={r} className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${regions.includes(r) ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-gray-300 text-gray-700'}`}>
                <input type="checkbox" className="hidden" checked={regions.includes(r)} onChange={() => toggleRegion(r)} />
                {r}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



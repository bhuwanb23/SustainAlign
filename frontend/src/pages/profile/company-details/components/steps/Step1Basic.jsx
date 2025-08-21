export default function Step1Basic({
  companyName, setCompanyName,
  logoFile, setLogoFile,
  registrationId, setRegistrationId,
  industry, setIndustry,
  hqCountry, setHqCountry,
  hqState, setHqState,
  hqCity, setHqCity,
  branches, setBranches,
  right,
}) {
  const addBranch = () => setBranches([...branches, { country: '', state: '', city: '' }])
  const updateBranch = (i, key, val) => setBranches(branches.map((b, idx) => idx === i ? { ...b, [key]: val } : b))
  const removeBranch = (i) => setBranches(branches.filter((_, idx) => idx !== i))

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Basic Company Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Company Name</label>
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Registration Number / Corporate ID</label>
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={registrationId} onChange={(e) => setRegistrationId(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Industry / Sector</label>
          <select className="w-full rounded-lg border border-gray-300 px-3 py-2" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {['','IT','Manufacturing','Healthcare','Finance','Energy','Retail','Telecom'].map((o) => <option key={o} value={o}>{o || 'Select'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Logo & Branding</label>
          <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
        </div>
        </div>
        {right}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">HQ Country</label>
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={hqCountry} onChange={(e) => setHqCountry(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">HQ State</label>
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={hqState} onChange={(e) => setHqState(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">HQ City</label>
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={hqCity} onChange={(e) => setHqCity(e.target.value)} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-800">Branch Locations (optional)</label>
          <button type="button" className="text-emerald-700 text-sm" onClick={addBranch}>+ Add Branch</button>
        </div>
        <div className="space-y-3">
          {branches.map((b, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <input placeholder="Country" className="rounded-lg border border-gray-300 px-3 py-2" value={b.country} onChange={(e) => updateBranch(i, 'country', e.target.value)} />
              <input placeholder="State" className="rounded-lg border border-gray-300 px-3 py-2" value={b.state} onChange={(e) => updateBranch(i, 'state', e.target.value)} />
              <input placeholder="City" className="rounded-lg border border-gray-300 px-3 py-2" value={b.city} onChange={(e) => updateBranch(i, 'city', e.target.value)} />
              <button type="button" className="text-sm text-red-600" onClick={() => removeBranch(i)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



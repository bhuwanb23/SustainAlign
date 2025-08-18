export default function CompanyForm({ company, sectors, goals, onChange, onSave }) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input className="mt-1 w-full border border-gray-200 rounded-xl p-2.5" value={company.name} onChange={(e) => onChange({ ...company, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CSR Budget (USD)</label>
          <input type="number" className="mt-1 w-full border border-gray-200 rounded-xl p-2.5" value={company.budget} onChange={(e) => onChange({ ...company, budget: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sector Focus</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button type="button" key={s} className={`px-3 py-1.5 rounded-full border ${company.sectors.includes(s) ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`} onClick={() => onChange({ ...company, sectors: company.sectors.includes(s) ? company.sectors.filter((x) => x !== s) : [...company.sectors, s] })}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ESG Targets</label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          {goals.map((g) => (
            <label key={g} className="flex items-center space-x-3 p-3 border rounded-xl">
              <input type="checkbox" checked={company.goals.includes(g)} onChange={(e) => onChange({ ...company, goals: e.target.checked ? [...company.goals, g] : company.goals.filter((x) => x !== g) })} />
              <span className="text-gray-700">{g}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="text-right">
        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl" onClick={onSave}>Save</button>
      </div>
    </form>
  )
}



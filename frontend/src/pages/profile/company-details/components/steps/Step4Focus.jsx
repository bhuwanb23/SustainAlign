import EsgTargetsCard from '../EsgTargetsCard.jsx'

export default function Step4Focus({ prioritySdgs, setPrioritySdgs, esgGoals, setEsgGoals, themes, setThemes, targetYear, setTargetYear, reportingStandard, setReportingStandard, right }) {
  const SDG_OPTIONS = ['No Poverty','Zero Hunger','Good Health','Quality Education','Clean Water','Affordable Energy','Decent Work','Industry & Innovation','Reduced Inequalities','Sustainable Cities','Responsible Consumption','Climate Action','Life Below Water','Life On Land','Peace & Justice','Partnerships']
  const toggle = (s) => setPrioritySdgs(prioritySdgs.includes(s) ? prioritySdgs.filter((x) => x !== s) : [...prioritySdgs, s])
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">CSR/ESG Focus Areas</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Priority SDGs</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SDG_OPTIONS.map((s) => (
                <label key={s} className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${prioritySdgs.includes(s) ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-gray-300 text-gray-700'}`}>
                  <input type="checkbox" className="hidden" checked={prioritySdgs.includes(s)} onChange={() => toggle(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">ESG Goals (free text)</label>
            <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2" value={esgGoals} onChange={(e) => setEsgGoals(e.target.value)} placeholder="e.g., Net Zero by 2035, Women in Leadership 40% by 2030" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Key Thematic Areas</label>
            <textarea rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2" value={themes} onChange={(e) => setThemes(e.target.value)} placeholder="Renewable energy, skilling, poverty reduction" />
          </div>
          <EsgTargetsCard
            targetYear={targetYear}
            setTargetYear={setTargetYear}
            reportingStandard={reportingStandard}
            setReportingStandard={setReportingStandard}
          />
        </div>
        <div>
          {right}
        </div>
      </div>
    </div>
  )
}



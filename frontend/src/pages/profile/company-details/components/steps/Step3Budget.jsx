import CsrBudgetCard from '../CsrBudgetCard.jsx'
import SectorPrioritiesCard from '../SectorPrioritiesCard.jsx'

export default function Step3Budget({ budget, setBudget, currency, setCurrency, splits, setSplits, projectSize, setProjectSize, right, climatePercent, educationPercent, healthcarePercent }) {
  const total = Object.values(splits).reduce((a, b) => a + Number(b || 0), 0)
  const setSplit = (key, value) => setSplits({ ...splits, [key]: Math.max(0, Math.min(100, Number(value) || 0)) })

  const setClimatePercent = (v) => setSplit('environment', v)
  const setEducationPercent = (v) => setSplit('education', v)
  const setHealthcarePercent = (v) => setSplit('healthcare', v)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">CSR Budget & Financials</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CsrBudgetCard totalBudget={budget} setTotalBudget={setBudget} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {['INR','USD','EUR','GBP','AED','JPY'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Project Size</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent" value={projectSize} onChange={(e) => setProjectSize(e.target.value)}>
                <option>Small &lt;10L</option>
                <option>Medium 10L–1Cr</option>
                <option>Large &gt;1Cr</option>
              </select>
            </div>
          </div>
          <SectorPrioritiesCard
            climatePercent={climatePercent}
            setClimatePercent={setClimatePercent}
            educationPercent={educationPercent}
            setEducationPercent={setEducationPercent}
            healthcarePercent={healthcarePercent}
            setHealthcarePercent={setHealthcarePercent}
          />
          <div className="text-sm text-gray-600">Split total: <span className={total === 100 ? 'text-emerald-600 font-medium' : 'text-red-600 font-medium'}>{total}%</span> (must be 100%)</div>
        </div>
        <div>
          {right}
        </div>
      </div>
    </div>
  )
}



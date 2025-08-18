export default function EsgSdgSection({ esg, sdgHeatmap, comparison }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm">ESG Breakdown</div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {['E','S','G'].map((k, i) => (
            <div key={k} className="p-4 bg-emerald-50 rounded-xl text-center">
              <div className="text-2xl font-extrabold text-emerald-700">{esg[i]}</div>
              <div className="text-xs text-gray-600 mt-1">{k}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm mb-2">Top 5 SDGs Alignment</div>
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {sdgHeatmap.map((s) => (
            <div key={s.label} className={`p-2 rounded-lg ${s.score>75?'bg-emerald-100':s.score>50?'bg-yellow-100':'bg-red-100'}`}>{s.short}</div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm">ESG vs Industry</div>
        <div className="mt-3">
          <div className="text-sm text-gray-700">Your score: <span className="font-semibold">{comparison.yours}</span></div>
          <div className="text-sm text-gray-700">Industry avg: <span className="font-semibold">{comparison.industry}</span></div>
        </div>
      </div>
    </div>
  )
}



import { widthClassFromPercent } from '../../../lib/ui.js'

export default function AlignmentPanel({ esgScore, sdgs, alignedPct }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm">ESG Score</div>
        <div className="mt-2 flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-2xl font-extrabold text-emerald-700">{esgScore}</div>
          <div className="text-sm text-gray-700">Overall performance</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm">Top SDGs</div>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {sdgs.slice(0,3).map((s) => (
            <span key={s.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm">{s.icon} {s.label}</span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm">Alignment Progress</div>
        <div className="text-2xl font-extrabold text-gray-900">{alignedPct}%</div>
        <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
          {(() => {
            const w = widthClassFromPercent(alignedPct)
            return <div className={`bg-emerald-600 h-2 rounded-full ${w}`}></div>
          })()}
        </div>
      </div>
    </div>
  )
}



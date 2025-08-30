import { widthClassFromPercent } from '../../../../lib/ui.js'

function pctWidth(value, max) {
  const n = typeof value === 'number' ? value : parseFloat(value || 0)
  const m = typeof max === 'number' ? max : parseFloat(max || 0)
  const pct = !m || !isFinite(n) ? 0 : Math.min(100, Math.round((n / m) * 100))
  return widthClassFromPercent(pct)
}

function fmt(val) {
  const n = typeof val === 'number' ? val : parseFloat(val || 0)
  if (!isFinite(n)) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n.toFixed(0)}`
}

export default function ProjectRow({ project, maxCost, maxFunding, maxDuration }) {
  return (
    <div className="grid grid-cols-8 gap-4 p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50/20 to-sky-50/20 hover:from-emerald-100/30 hover:to-sky-100/30 transition-colors">
      <div className="col-span-2 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow"
             style={{ backgroundColor: '#10B981' }}>{project.icon || '📦'}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.subtitle}</p>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="w-28">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className={`bg-emerald-500 h-2 rounded-full ${pctWidth(project.cost, maxCost)}`}></div>
          </div>
          <div className="text-xs text-gray-700 mt-1 font-medium">{fmt(project.cost)}</div>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="w-28">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className={`bg-teal-500 h-2 rounded-full ${pctWidth(project.fundingRequired, maxFunding)}`}></div>
          </div>
          <div className="text-xs text-gray-700 mt-1 font-medium">{fmt(project.fundingRequired)}</div>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="w-20">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className={`bg-sky-500 h-2 rounded-full ${pctWidth(project.durationMonths, maxDuration)}`}></div>
          </div>
          <div className="text-xs text-gray-700 mt-1 font-medium">{fmt(project.durationMonths)}</div>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <span className="font-medium text-gray-800">{fmt(project.pastProjectsCompleted)}</span>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="flex space-x-1">
          {project.sdg?.map((n) => (
            <span key={n} className="bg-sky-500 text-white text-xs px-2 py-1 rounded">{n}</span>
          ))}
        </div>
      </div>
      <div className="text-center flex items-center justify-center space-x-2">
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">Select</button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Save</button>
      </div>
    </div>
  )
}



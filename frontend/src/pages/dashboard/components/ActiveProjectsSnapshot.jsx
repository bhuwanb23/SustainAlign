import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { widthClassFromPercent } from '../../../lib/ui.js'

export default function ActiveProjectsSnapshot({ projects, kpis }) {
  const sectorCounts = { Health: 3, Education: 5, Climate: 2, Community: 4 }
  const sectorOptions = {
    chart: { type: 'column', height: 220, backgroundColor: 'transparent' },
    title: { text: '' }, credits: { enabled: false }, legend: { enabled: false },
    xAxis: { categories: Object.keys(sectorCounts) }, yAxis: { title: { text: '' } },
    colors: ['#3B82F6'],
    series: [{ data: Object.values(sectorCounts) }],
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
          <a href="/monitoring/impact" className="text-emerald-700 text-sm">View All</a>
        </div>
        <div className="space-y-3">
          {projects.slice(0,5).map((p) => (
            <div key={p.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{p.title}</div>
                <div className="text-sm text-gray-600">{p.ngo} · {p.location}</div>
              </div>
              <div className="w-40">
                <div className="text-xs text-gray-600">Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  {(() => {
                    const w = widthClassFromPercent(p.progress)
                    const color = p.status==='on'?'bg-emerald-600':p.status==='delay'?'bg-yellow-500':'bg-red-500'
                    return <div className={`h-2 rounded-full ${color} ${w}`}></div>
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="text-gray-600 text-sm mb-2">Impact Highlights</div>
        <ul className="space-y-2">
          {kpis.map((k) => (
            <li key={k.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">{k.label}</span>
              <span className="font-semibold text-gray-900">{k.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <div className="text-gray-600 text-sm mb-1">Sector-wise Distribution</div>
          <HighchartsReact highcharts={Highcharts} options={sectorOptions} />
        </div>
      </div>
    </div>
  )
}



import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function FinancialsSection({ allocationData = [], trendData = [], breakdown }) {
  // Demo sector data if not provided
  const sectors = allocationData.length ? allocationData.map(s => s.sector) : ['Health','Education','Climate','Community']
  const allocated = allocationData.length ? allocationData.map(s => s.allocated) : [45, 30, 15, 10]
  const utilized = allocationData.length ? allocationData.map(s => s.utilized) : [32, 21, 12, 8]

  const allocOptions = {
    chart: { type: 'column', height: 260, backgroundColor: 'transparent' },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories: sectors, lineWidth: 0 },
    yAxis: { title: { text: '' }, gridLineWidth: 0 },
    legend: { align: 'right', verticalAlign: 'top' },
    colors: ['#10B981','#3B82F6'],
    series: [
      { name: 'Allocated', data: allocated },
      { name: 'Utilized', data: utilized },
    ],
  }

  const months = trendData.length ? trendData.map(d => d.label) : ['-11','-10','-9','-8','-7','-6','-5','-4','-3','-2','-1','Now']
  const trendValues = trendData.length ? trendData.map(d => d.value) : [12,14,13,15,16,18,19,20,21,20,22,24]
  const trendOptions = {
    chart: { type: 'spline', height: 260, backgroundColor: 'transparent' },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories: months, tickLength: 0 },
    yAxis: { title: { text: '' }, gridLineWidth: 0 },
    legend: { enabled: false },
    colors: ['#3B82F6'],
    series: [{ name: 'Spend', data: trendValues }],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl border shadow p-6 lg:col-span-2">
        <div className="text-gray-600 text-sm mb-2">Budget Allocation vs Utilization</div>
        <HighchartsReact highcharts={Highcharts} options={allocOptions} />
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm mb-2">CSR Spend Trend (12 months)</div>
        <HighchartsReact highcharts={Highcharts} options={trendOptions} />
      </div>

      <div className="bg-white rounded-2xl border shadow p-6 lg:col-span-3">
        <div className="text-gray-900 font-semibold mb-3">Project Budget Breakdown</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Project</th>
                <th className="p-2">Allocated</th>
                <th className="p-2">Spent</th>
                <th className="p-2">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((r, i) => (
                <tr key={i} className="odd:bg-gray-50">
                  <td className="p-2">{r.project}</td>
                  <td className="p-2">₹ {r.allocated.toLocaleString()}</td>
                  <td className="p-2">₹ {r.spent.toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 h-1.5 rounded">
                        <div className="bg-emerald-600 h-1.5 rounded" style={{width: `${Math.round((r.spent/r.allocated)*100)}%`}}></div>
                      </div>
                      <span>{Math.round((r.spent/r.allocated)*100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



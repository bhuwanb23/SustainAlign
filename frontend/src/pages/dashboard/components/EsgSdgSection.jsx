import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function EsgSdgSection({ esg, sdgHeatmap, comparison }) {
  const esgOptions = {
    chart: { type: 'bar', height: 260, backgroundColor: 'transparent' },
    title: { text: '' }, credits: { enabled: false }, legend: { enabled: false },
    xAxis: { categories: ['E','S','G'] }, yAxis: { max: 100, title: { text: '' } },
    colors: ['#10B981'],
    series: [{ data: esg }],
  }

  const compareOptions = {
    chart: { type: 'column', height: 260, backgroundColor: 'transparent' },
    title: { text: '' }, credits: { enabled: false },
    xAxis: { categories: ['Company','Industry'] }, yAxis: { max: 100, title: { text: '' } },
    colors: ['#10B981','#3B82F6'],
    series: [{ name:'Score', data: [comparison.yours, comparison.industry] }],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-600 text-sm">ESG Breakdown</div>
        <HighchartsReact highcharts={Highcharts} options={esgOptions} />
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
        <HighchartsReact highcharts={Highcharts} options={compareOptions} />
      </div>
    </div>
  )
}



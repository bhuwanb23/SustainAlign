import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function EsgChart({ categories, scores }) {
  const options = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 300 },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories },
    yAxis: { title: { text: 'Score' }, max: 100 },
    legend: { enabled: false },
    colors: ['#10B981'],
    series: [{ name: 'ESG Score', data: scores }],
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">ESG Performance</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}



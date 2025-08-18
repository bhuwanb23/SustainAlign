import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function BudgetChart({ data }) {
  const options = {
    chart: { type: 'pie', backgroundColor: 'transparent', height: 300 },
    title: { text: '' },
    credits: { enabled: false },
    legend: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '60%',
        dataLabels: { enabled: true, format: '{point.name}: {point.percentage:.1f}%' },
      },
    },
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'],
    series: [{ name: 'Budget', data }],
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Allocation</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}



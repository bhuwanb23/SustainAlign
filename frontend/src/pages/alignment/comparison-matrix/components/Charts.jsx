import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function CostImpactChart() {
  const options = {
    chart: { type: 'scatter', height: 300 },
    title: { text: undefined },
    xAxis: { title: { text: 'Cost ($K)' } },
    yAxis: { title: { text: 'Impact Score' } },
    series: [{
      name: 'Projects',
      color: '#10B981',
      data: [[450, 8.5], [680, 9.2], [320, 7.8], [520, 8.1], [380, 7.6]],
    }],
    credits: { enabled: false },
    legend: { enabled: false },
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export function EsgScoreChart() {
  const options = {
    chart: { type: 'column', height: 300 },
    title: { text: undefined },
    xAxis: { categories: ['Solar Village', 'Education', 'Clean Water', 'Healthcare', 'Agriculture'] },
    yAxis: { title: { text: 'ESG Score' }, max: 10 },
    series: [{ name: 'ESG Score', color: '#0EA5E9', data: [9.2, 9.5, 8.8, 8.9, 8.3] }],
    credits: { enabled: false },
    legend: { enabled: false },
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />
}



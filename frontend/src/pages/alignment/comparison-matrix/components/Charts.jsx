import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function toNumber(v) {
  if (typeof v === 'number') return v
  const n = parseFloat(v || 0)
  return isFinite(n) ? n : 0
}

export function CostFundingChart({ projects = [] }) {
  const data = projects.map(p => ({
    name: p.name || `#${p.id}`,
    x: toNumber(p.cost) / 1000, // show in $K
    y: toNumber(p.fundingRequired) / 1000,
  }))
  const options = {
    chart: { type: 'scatter', height: 300, backgroundColor: 'transparent' },
    title: { text: undefined },
    xAxis: { title: { text: 'Cost ($K)' } },
    yAxis: { title: { text: 'Funding Required ($K)' } },
    tooltip: {
      pointFormat: '<b>{point.name}</b><br/>Cost: ${point.x:.0f}K<br/>Funding: ${point.y:.0f}K'
    },
    series: [{
      name: 'Projects',
      color: '#10B981',
      data,
    }],
    credits: { enabled: false },
    legend: { enabled: false },
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export function DurationChart({ projects = [] }) {
  const categories = projects.map(p => p.name || `#${p.id}`)
  const data = projects.map(p => toNumber(p.durationMonths))
  const options = {
    chart: { type: 'column', height: 300, backgroundColor: 'transparent' },
    title: { text: undefined },
    xAxis: { categories, labels: { style: { fontSize: '11px' } } },
    yAxis: { title: { text: 'Duration (months)' } },
    series: [{ name: 'Duration', color: '#0EA5E9', data }],
    credits: { enabled: false },
    legend: { enabled: false },
    tooltip: { pointFormat: '<b>{point.category}</b><br/>Duration: {point.y:.0f} months' }
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

// Backward-compatible aliases
export function EsgScoreChart(props) {
  return <DurationChart {...props} />
}

export function CostImpactChart(props) {
  return <CostFundingChart {...props} />
}



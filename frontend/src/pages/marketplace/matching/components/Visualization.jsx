import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import SankeyModule from 'highcharts/modules/sankey'

// Initialize the Sankey module in a way that works across ESM/CJS builds
if (typeof Highcharts === 'object') {
    const sankeyFactory = (SankeyModule && typeof SankeyModule === 'object' && 'default' in SankeyModule)
        ? SankeyModule.default
        : SankeyModule
    if (typeof sankeyFactory === 'function' && !Highcharts.seriesTypes.sankey) {
        sankeyFactory(Highcharts)
    }
}

const sankeyOptions = {
    chart: { type: 'sankey', backgroundColor: 'transparent', height: 260 },
    title: { text: 'Corporate Goals → SDGs', style: { fontSize: '14px' } },
    credits: { enabled: false },
    series: [{
        keys: ['from', 'to', 'weight'],
        data: [
            ['Environmental Focus', 'SDG 6 (Clean Water)', 8],
            ['Environmental Focus', 'SDG 7 (Clean Energy)', 9],
            ['Environmental Focus', 'SDG 13 (Climate)', 7],
            ['Digital Innovation', 'SDG 4 (Education)', 6],
            ['Digital Innovation', 'SDG 9 (Innovation)', 8],
            ['Sustainability', 'SDG 7 (Clean Energy)', 9],
            ['Sustainability', 'SDG 13 (Climate)', 8],
            ['Community Impact', 'SDG 3 (Health)', 7],
            ['Community Impact', 'SDG 6 (Clean Water)', 8]
        ],
        name: 'Alignment Flow'
    }]
}

const barsOptions = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 260 },
    title: { text: 'Match Score Distribution', style: { fontSize: '14px' } },
    xAxis: { categories: ['0-20', '20-40', '40-60', '60-80', '80-100'] },
    yAxis: { title: { text: '' } },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [{ name: 'Projects', data: [12, 28, 40, 22, 10], color: '#10b981' }]
}

const donutOptions = {
    chart: { type: 'pie', backgroundColor: 'transparent', height: 260 },
    title: { text: 'SDG Alignment Split', style: { fontSize: '14px' } },
    plotOptions: { pie: { innerSize: '55%', dataLabels: { enabled: true } } },
    credits: { enabled: false },
    series: [{
        name: 'Share',
        data: [
            { name: 'SDG 6', y: 30, color: '#3b82f6' },
            { name: 'SDG 7', y: 25, color: '#10b981' },
            { name: 'SDG 13', y: 20, color: '#f59e0b' },
            { name: 'SDG 4', y: 15, color: '#8b5cf6' },
            { name: 'SDG 3', y: 10, color: '#ef4444' }
        ]
    }]
}

export default function Visualization() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Matching Visualization</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-sky-50 p-3">
                    <HighchartsReact highcharts={Highcharts} options={sankeyOptions} />
                </div>
                <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-sky-50 p-3">
                    <HighchartsReact highcharts={Highcharts} options={barsOptions} />
                </div>
                <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-sky-50 p-3">
                    <HighchartsReact highcharts={Highcharts} options={donutOptions} />
                </div>
            </div>
        </div>
    )
}



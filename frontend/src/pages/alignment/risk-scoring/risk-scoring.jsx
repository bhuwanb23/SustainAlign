import useRiskScoring from './hooks/useRiskScoring.js'
import { Sidebar, HeadlineMetrics } from './components/RiskPanel.jsx'
import { CostImpactChart as RadarShim, EsgScoreChart as LineShim } from '../../alignment/comparison-matrix/components/Charts.jsx'

export default function RiskScoringPage() {
  const {
    query,
    setQuery,
    riskFilter,
    setRiskFilter,
    ngos,
    selectedNgo,
    setSelectedNgoId,
    metrics,
  } = useRiskScoring()

  return (
    <div className="bg-gray-50">
      <div className="flex min-h-screen">
        <Sidebar
          query={query}
          setQuery={setQuery}
          riskFilter={riskFilter}
          setRiskFilter={setRiskFilter}
          ngos={ngos}
          onSelect={setSelectedNgoId}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Risk Analysis Dashboard</h2>
                <p className="text-gray-600 mt-1">Comprehensive NGO and project risk evaluation</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  ⬇ Export Report
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <HeadlineMetrics metrics={metrics} />

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Analysis</h3>
                <RadarShim />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends</h3>
                <LineShim />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{selectedNgo.name} - Detailed Risk Assessment</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <InfoBubble colorBg="bg-risk-low" icon="✔" title="Verified NGO" subtitle="Full compliance" />
                  <InfoBubble colorBg="bg-emerald-500" icon="⚖️" title="Legal Standing" subtitle="Excellent" />
                  <InfoBubble colorBg="bg-blue-500" icon="📈" title="Performance" subtitle="Above average" />
                </div>

                <MetricBar label="Financial Stability" valuePct={92} tone="low" />
                <MetricBar label="Past Compliance" valuePct={88} tone="low" />
                <MetricBar label="Execution Track Record" valuePct={95} tone="low" />
                <MetricBar label="Transparency Score" valuePct={90} tone="low" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoBubble({ colorBg, icon, title, subtitle }) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${colorBg} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}

function MetricBar({ label, valuePct, tone }) {
  const toneClass = tone === 'low' ? 'text-risk-low bg-risk-low' : tone === 'medium' ? 'text-risk-medium bg-risk-medium' : 'text-risk-high bg-risk-high'
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${toneClass.split(' ')[0]}`}>{valuePct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${toneClass.split(' ')[1]} h-2 rounded-full`} style={{ width: `${valuePct}%` }}></div>
      </div>
    </div>
  )
}



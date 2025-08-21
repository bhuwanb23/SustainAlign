export default function SummaryCards({ summary }) {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Activity</h3>
            <span className="text-emerald-500 text-xl">📅</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">AI Recommendations</span>
              <span className="font-semibold text-blue-600">{summary.ai}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Approvals</span>
              <span className="font-semibold text-emerald-600">{summary.approvals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rejections</span>
              <span className="font-semibold text-red-600">{summary.rejections}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Compliance Score</h3>
            <span className="text-emerald-500 text-xl">🛡️</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{summary.complianceScorePct}%</div>
            <div className="text-sm text-gray-600">Excellent compliance rating</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Risk Level</h3>
            <span className="text-emerald-500 text-xl">📈</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{summary.riskLevelText}</div>
            <div className="text-sm text-gray-600">{summary.riskAverage}/10 average risk score</div>
          </div>
        </div>
      </div>
    </section>
  )
}



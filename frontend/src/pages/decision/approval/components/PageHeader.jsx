export default function PageHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Recommendation Analysis</h2>
          <p className="text-gray-600">Transparent decision rationale for Project Echo-2024</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">⬇️ Export Report</button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:opacity-90">✔️ Approve Recommendation</button>
        </div>
      </div>
    </div>
  )
}



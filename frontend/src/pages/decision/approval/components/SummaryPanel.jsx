function ProjectDetails() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Project Name</label>
          <p className="text-gray-900">Green Energy Initiative 2024</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Budget</label>
          <p className="text-gray-900">$2.4M</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Timeline</label>
          <p className="text-gray-900">Q2 2024 - Q1 2025</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Impact Score</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full w-4/5" />
            </div>
            <span className="text-sm font-medium text-gray-700">8.5/10</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AiRationale() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendation</h3>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
          <span className="text-blue-600 mr-2">🤖</span>
          <span className="font-medium text-gray-900">Strongly Recommended</span>
        </div>
        <p className="text-sm text-gray-700">Based on environmental impact analysis, ROI projections, and compliance metrics.</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-green-500 mr-3">✔️</span>
          <span className="text-sm text-gray-700">95% compliance confidence</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-500 mr-3">✔️</span>
          <span className="text-sm text-gray-700">Positive environmental impact</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-500 mr-3">✔️</span>
          <span className="text-sm text-gray-700">Strong financial returns</span>
        </div>
      </div>
    </div>
  )
}

function ComplianceNotes() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Notes</h3>
      <div className="space-y-3">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
          <p className="text-sm text-yellow-800">EPA certification required before Q3 implementation.</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-3">
          <p className="text-sm text-green-800">ISO 14001 standards fully met.</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
          <p className="text-sm text-blue-800">Quarterly reporting framework established.</p>
        </div>
      </div>
      <textarea
        placeholder="Add compliance notes..."
        className="w-full mt-4 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
    </div>
  )
}

export default function SummaryPanel() {
  return (
    <aside className="space-y-6">
      <ProjectDetails />
      <AiRationale />
      <ComplianceNotes />
    </aside>
  )
}



export function ProjectOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommended Project: Clean Water Initiative Ghana</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🏢 WaterAid International</span>
            <span>💵 $45,000 requested</span>
            <span>📅 12 months duration</span>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">92% Match Score</div>
      </div>
      <p className="text-gray-700 leading-relaxed">
        This project aims to provide clean water access to 500 families in rural Ghana through sustainable well
        construction and water purification systems, directly aligning with SDG 6 (Clean Water and Sanitation).
      </p>
    </div>
  )
}

export function SdgAlignment() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">🌐</div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">SDG Alignment Analysis</h4>
          <p className="text-sm text-gray-600">Sustainable Development Goals compatibility</p>
        </div>
        <div className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">95% Match</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl mb-2">🌍</div>
          <div className="text-sm font-medium text-gray-900">SDG 6</div>
          <div className="text-xs text-gray-600">Clean Water</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl mb-2">🌱</div>
          <div className="text-sm font-medium text-gray-900">SDG 3</div>
          <div className="text-xs text-gray-600">Good Health</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl mb-2">📚</div>
          <div className="text-sm font-medium text-gray-900">SDG 1</div>
          <div className="text-xs text-gray-600">No Poverty</div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>AI Analysis:</strong> Direct alignment with primary SDG 6 targets. Secondary benefits include improved health outcomes and economic opportunities for beneficiaries.
        </p>
      </div>
    </div>
  )
}

export function CostBenefit() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">📈</div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Cost-Benefit Analysis</h4>
          <p className="text-sm text-gray-600">Financial efficiency and impact assessment</p>
        </div>
        <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Excellent ROI</div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Investment Breakdown</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Infrastructure</span><span className="font-medium">$30,000 (67%)</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Training & Education</span><span className="font-medium">$10,000 (22%)</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Monitoring</span><span className="font-medium">$5,000 (11%)</span></div>
          </div>
        </div>
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Expected Impact</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">People served</span><span className="font-medium">2,500</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Cost per beneficiary</span><span className="font-medium">$18</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Sustainability score</span><span className="font-medium">8.5/10</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NgoCredibility() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">🛡️</div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">NGO Credibility Assessment</h4>
          <p className="text-sm text-gray-600">Organization reliability and track record</p>
        </div>
        <div className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Verified Partner</div>
      </div>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">A+</div>
          <div className="text-xs text-gray-600">Financial Rating</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">15</div>
          <div className="text-xs text-gray-600">Years Experience</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">98%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-600">45</div>
          <div className="text-xs text-gray-600">Completed Projects</div>
        </div>
      </div>
    </div>
  )
}



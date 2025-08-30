export function ProjectOverview({ rationale, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!rationale) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <p className="text-gray-500 text-center">No rationale data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{rationale.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {rationale.context?.ngo_name && <span>🏢 {rationale.context.ngo_name}</span>}
            {rationale.context?.budget && <span>💵 ${rationale.context.budget.toLocaleString()} requested</span>}
            {rationale.context?.duration && <span>📅 {rationale.context.duration} months duration</span>}
          </div>
        </div>
        {rationale.scoreBreakdown && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {Math.round(Object.values(rationale.scoreBreakdown).reduce((sum, scores) => 
              sum + Object.values(scores).reduce((s, score) => s + score, 0), 0
            ) / Object.keys(rationale.scoreBreakdown).length)}% Match Score
          </div>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed">
        {rationale.context?.description || 'Project description not available'}
      </p>
    </div>
  )
}

export function SdgAlignment({ rationale, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!rationale) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-center">No SDG alignment data available</p>
      </div>
    )
  }

  const sdgData = rationale.context?.sdg_goals || []
  const alignmentScore = rationale.context?.sdg_alignment_score || 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">🌐</div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">SDG Alignment Analysis</h4>
          <p className="text-sm text-gray-600">Sustainable Development Goals compatibility</p>
        </div>
        <div className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {alignmentScore}% Match
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {sdgData.slice(0, 3).map((sdg, index) => (
          <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-sm font-medium text-gray-900">SDG {sdg.number}</div>
            <div className="text-xs text-gray-600">{sdg.name}</div>
          </div>
        ))}
        {sdgData.length === 0 && (
          <div className="col-span-3 text-center py-4 text-gray-500">
            No SDG data available
          </div>
        )}
      </div>
      {rationale.reasoningSteps && rationale.reasoningSteps.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>AI Analysis:</strong> {rationale.reasoningSteps[0]}
          </p>
        </div>
      )}
    </div>
  )
}

export function CostBenefit({ rationale, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!rationale) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-center">No cost-benefit data available</p>
      </div>
    )
  }

  const costBreakdown = rationale.context?.cost_breakdown || {}
  const impactMetrics = rationale.context?.impact_metrics || {}

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">📈</div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Cost-Benefit Analysis</h4>
          <p className="text-sm text-gray-600">Financial efficiency and impact assessment</p>
        </div>
        <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {rationale.context?.roi_score ? `${rationale.context.roi_score}/10 ROI` : 'Excellent ROI'}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Investment Breakdown</h5>
          <div className="space-y-2 text-sm">
            {Object.entries(costBreakdown).map(([category, amount]) => (
              <div key={category} className="flex justify-between">
                <span className="text-gray-600 capitalize">{category.replace(/_/g, ' ')}</span>
                <span className="font-medium">${amount?.toLocaleString() || 0}</span>
              </div>
            ))}
            {Object.keys(costBreakdown).length === 0 && (
              <div className="text-gray-500 text-sm">No cost breakdown available</div>
            )}
          </div>
        </div>
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Expected Impact</h5>
          <div className="space-y-2 text-sm">
            {Object.entries(impactMetrics).map(([metric, value]) => (
              <div key={metric} className="flex justify-between">
                <span className="text-gray-600 capitalize">{metric.replace(/_/g, ' ')}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
            {Object.keys(impactMetrics).length === 0 && (
              <div className="text-gray-500 text-sm">No impact metrics available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function NgoCredibility({ rationale, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!rationale) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-center">No NGO credibility data available</p>
      </div>
    )
  }

  const credibilityData = rationale.context?.ngo_credibility || {}
  const pros = rationale.pros || []
  const cons = rationale.cons || []

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">🛡️</div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">NGO Credibility Assessment</h4>
          <p className="text-sm text-gray-600">Organization reliability and track record</p>
        </div>
        <div className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          {credibilityData.rating || 'N/A'}/10
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Strengths</h5>
          <div className="space-y-2">
            {pros.map((pro, index) => (
              <div key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-700">{pro}</span>
              </div>
            ))}
            {pros.length === 0 && (
              <div className="text-gray-500 text-sm">No strengths listed</div>
            )}
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Concerns</h5>
          <div className="space-y-2">
            {cons.map((con, index) => (
              <div key={index} className="flex items-start">
                <span className="text-red-500 mr-2">⚠</span>
                <span className="text-sm text-gray-700">{con}</span>
              </div>
            ))}
            {cons.length === 0 && (
              <div className="text-gray-500 text-sm">No concerns listed</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}





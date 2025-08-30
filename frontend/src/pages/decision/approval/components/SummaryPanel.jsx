import { useState } from 'react'

function ProjectDetails({ selected }) {
  const project = selected?.project || {}
  const aiRecommendation = selected?.aiRecommendation || {}
  const complianceMetrics = selected?.complianceMetrics || {}

  // Fix data extraction to match the actual structure
  const projectTitle = selected?.projectTitle || project?.title || '—'
  const budget = project?.financials?.funding_required 
    ? `${project.financials.currency || '₹'} ${project.financials.funding_required}`
    : project?.budget || '—'
  
  const timeline = project?.timeline 
    ? `${project.timeline.start_date ? new Date(project.timeline.start_date).toLocaleDateString() : '—'} - ${project.timeline.end_date ? new Date(project.timeline.end_date).toLocaleDateString() : '—'}`
    : project?.start_date && project?.end_date
    ? `${new Date(project.start_date).toLocaleDateString()} - ${new Date(project.end_date).toLocaleDateString()}`
    : '—'
  
  const location = project?.location?.city || project?.location || project?.region || '—'
  const organization = project?.organization || project?.ngo?.name || project?.implementing_partner || '—'
  const sdgFocus = project?.sdg_focus || project?.sdgs || project?.sdgFocus || '—'
  const description = project?.description || '—'

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg">📊</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
      </div>
      
      <div className="space-y-6">
        {/* Project Description */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Description</label>
          <p className="text-gray-700 bg-gray-50 rounded-lg p-4 break-words text-wrap">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Name</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg p-3 break-words">{projectTitle}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Organization</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg p-3 break-words">{organization}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Budget</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg p-3 break-words">{budget}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Timeline</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg p-3 break-words">{timeline}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Location</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg p-3 break-words">{location}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">SDG Focus</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg p-3 break-words">
              {Array.isArray(sdgFocus) ? sdgFocus.join(', ') : sdgFocus}
            </p>
          </div>
        </div>

        {/* Impact Score */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-3 block">Impact Score</label>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Environmental Impact</span>
              <span className="text-lg font-bold text-gray-900">8.5/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full w-4/5" />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AiRationale({ selected }) {
  const aiRecommendation = selected?.aiRecommendation || {}
  const complianceMetrics = selected?.complianceMetrics || {}

  const getRecommendationColor = (label) => {
    switch (label?.toLowerCase()) {
      case 'strongly recommended': return 'from-green-50 to-emerald-50 border-green-200'
      case 'recommended': return 'from-blue-50 to-cyan-50 border-blue-200'
      case 'neutral': return 'from-yellow-50 to-orange-50 border-yellow-200'
      case 'not recommended': return 'from-red-50 to-pink-50 border-red-200'
      default: return 'from-gray-50 to-blue-50 border-gray-200'
    }
  }

  const getRecommendationIcon = (label) => {
    switch (label?.toLowerCase()) {
      case 'strongly recommended': return '🤖✅'
      case 'recommended': return '🤖👍'
      case 'neutral': return '🤖🤔'
      case 'not recommended': return '🤖❌'
      default: return '🤖'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg">🤖</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">AI Recommendation</h3>
      </div>
      
      <div className={`bg-gradient-to-r ${getRecommendationColor(aiRecommendation.label)} rounded-xl p-4 mb-6 border`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
          <span className="text-2xl sm:mr-3">{getRecommendationIcon(aiRecommendation.label)}</span>
          <div className="min-w-0">
            <span className="font-bold text-gray-900 text-lg block break-words">
              {aiRecommendation.label || 'Strongly Recommended'}
            </span>
            {aiRecommendation.confidencePct && (
              <div className="text-sm text-gray-600">
                {aiRecommendation.confidencePct}% confidence
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-700 break-words">
          {aiRecommendation.reasons?.[0] || 'Based on environmental impact analysis, ROI projections, and compliance metrics.'}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <span className="text-green-600 mr-3 text-lg flex-shrink-0">✅</span>
          <span className="text-sm text-gray-700 break-words">
            {complianceMetrics.complianceConfidencePct || 95}% compliance confidence
          </span>
        </div>
        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-blue-600 mr-3 text-lg flex-shrink-0">🌱</span>
          <span className="text-sm text-gray-700 break-words">
            {complianceMetrics.impactPositive ? 'Positive' : 'Neutral'} environmental impact
          </span>
        </div>
        <div className="flex items-center p-3 bg-purple-50 rounded-lg">
          <span className="text-purple-600 mr-3 text-lg flex-shrink-0">💰</span>
          <span className="text-sm text-gray-700 break-words">
            {complianceMetrics.roi || 'Strong'} financial returns
          </span>
        </div>
      </div>
    </div>
  )
}

function ComplianceNotes({ selected }) {
  const [notes, setNotes] = useState('')
  const complianceNotes = selected?.complianceNotes || []

  const handleSaveNotes = () => {
    // TODO: Implement save functionality
    console.log('Saving notes:', notes)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg">📋</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Compliance Notes</h3>
      </div>
      
      <div className="space-y-4 mb-6">
        {complianceNotes.length > 0 ? (
          complianceNotes.map((note, index) => (
            <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-sm text-yellow-800 break-words">{note}</p>
            </div>
          ))
        ) : (
          <>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-sm text-yellow-800 break-words">EPA certification required before Q3 implementation.</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <p className="text-sm text-green-800 break-words">ISO 14001 standards fully met.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800 break-words">Quarterly reporting framework established.</p>
            </div>
          </>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">Add Compliance Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add compliance notes, requirements, or observations..."
          className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none focus-ring"
          rows={4}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSaveNotes}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium btn-animate"
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SummaryPanel({ selected }) {
  if (!selected) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Summary</h3>
        <p className="text-sm text-gray-600">Select a project to view detailed information</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ProjectDetails selected={selected} />
      <AiRationale selected={selected} />
      <ComplianceNotes selected={selected} />
    </div>
  )
}



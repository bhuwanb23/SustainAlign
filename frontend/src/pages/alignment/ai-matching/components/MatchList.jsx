import { useState } from 'react'
import { createAiMatch } from '../../../../lib/projectApi'

export default function MatchList({ items }) {
  const [creatingMatches, setCreatingMatches] = useState(new Set())

  const handleCreateMatch = async (projectId) => {
    if (creatingMatches.has(projectId)) return
    
    setCreatingMatches(prev => new Set(prev).add(projectId))
    
    try {
      // For demo purposes, use a default company ID (1)
      // In a real app, this would come from the current user's company
      const matchData = {
        project_id: projectId,
        company_id: 1, // Default company ID
        alignment_score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
        investment_min: 50000,
        investment_max: 500000,
        investment_currency: 'USD',
        timeline_months: 12,
        rationale: 'AI-generated match based on company preferences and project alignment'
      }
      
      await createAiMatch(matchData)
      alert('AI match created successfully!')
    } catch (error) {
      console.error('Failed to create AI match:', error)
      alert('Failed to create AI match: ' + error.message)
    } finally {
      setCreatingMatches(prev => {
        const newSet = new Set(prev)
        newSet.delete(projectId)
        return newSet
      })
    }
  }

  const handleViewDetails = (projectId) => {
    // Navigate to project details page
    window.location.href = `/discovery/projects/${projectId}`
  }

  return (
    <div className="space-y-6">
      {items.map((m) => (
        <article key={m.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{m.title}</h3>
                <div className="ml-4 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow">
                  {m.alignmentScore}%
                </div>
              </div>
              <p className="text-gray-600 mb-3">{m.summary}</p>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                <span>💲 {m.investmentRange}</span>
                <span>🕒 {m.timeline}</span>
                <span>📍 {m.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {m.tags?.map((t, idx) => (
                <div key={idx} className={`w-8 h-8 ${t.bg} rounded-full flex items-center justify-center shadow-sm`}>
                  <span className={`${t.fg} text-sm`}>{t.icon}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleViewDetails(m.projectId)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition-colors"
              >
                View Details
              </button>
              <button 
                onClick={() => handleCreateMatch(m.projectId)}
                disabled={creatingMatches.has(m.projectId)}
                className={`px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors ${
                  creatingMatches.has(m.projectId) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {creatingMatches.has(m.projectId) ? 'Creating...' : 'Create Match'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}



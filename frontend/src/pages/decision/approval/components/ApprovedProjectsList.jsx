import { useEffect, useMemo, useState } from 'react'
import { getApprovals, getProject } from '../../../../lib/projectApi'

export default function ApprovedProjectsList({ onSelect, selectedApprovalId }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const approvals = await getApprovals()
        // Enrich approvals with project details (title) if present
        const withProjects = await Promise.all(
          approvals.map(async (a) => {
            let projectTitle = a.project?.title
            const pid = a.project_id ?? a.projectId
            if (!projectTitle && pid) {
              try {
                const p = await getProject(pid)
                projectTitle = p.title
              } catch (_) {}
            }
            return { ...a, projectTitle, project_id: pid }
          })
        )
        if (isMounted) setItems(withProjects)
      } catch (e) {
        if (isMounted) setError(e.message || 'Failed to load approvals')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const filteredApprovals = useMemo(() => {
    if (!searchQuery) return items
    return items.filter(item => 
      (item.projectTitle || item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.status || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [items, searchQuery])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'in_review': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return '✅'
      case 'rejected': return '❌'
      case 'in_review': return '⏳'
      default: return '📋'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 skeleton"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg skeleton"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Projects</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors btn-animate"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden card-hover">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Project Approvals</h3>
          <div className="text-sm text-gray-500">{filteredApprovals.length} projects</div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus-ring"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Project List */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {filteredApprovals.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredApprovals.map((approval) => (
              <button
                key={approval.id}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-all duration-200 hover-lift ${
                  selectedApprovalId === approval.id 
                    ? 'bg-emerald-50 border-l-4 border-emerald-500' 
                    : ''
                }`}
                onClick={() => onSelect?.(approval)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {approval.projectTitle || approval.title || 'Untitled Project'}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Approval #{approval.id}
                    </p>
                  </div>
                  <div className={`ml-3 px-2 py-1 rounded-full text-xs font-medium border status-badge ${getStatusColor(approval.status)}`}>
                    <span className="flex items-center space-x-1">
                      <span>{getStatusIcon(approval.status)}</span>
                      <span>{approval.status || 'Pending'}</span>
                    </span>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Budget:</span> 
                    <span className="ml-1">
                      {approval.project?.financials?.currency || '₹'} 
                      {approval.project?.financials?.funding_required || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span> 
                    <span className="ml-1">
                      {approval.project?.timeline?.start_date ? 
                        new Date(approval.project.timeline.start_date).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>

                {/* Steps Progress */}
                {approval.steps && approval.steps.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>
                        {approval.steps.filter(s => s.status === 'approved').length}/{approval.steps.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300 progress-bar"
                        style={{ 
                          width: `${(approval.steps.filter(s => s.status === 'approved').length / approval.steps.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-sm text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search terms.' : 'No approval requests available.'}
            </p>
            
            {/* Sample Projects */}
            {!searchQuery && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500">Sample projects for testing:</p>
                {[{
                  id: 'sample-1',
                  title: 'Sustainable Agriculture Training',
                  location: 'Maharashtra, India',
                  budget: '₹1.0M',
                  status: 'in_review',
                  organization: 'Green Earth Foundation',
                  sdgFocus: ['2', '12', '15'],
                  description: 'Training farmers in organic farming and sustainable agricultural practices'
                }, {
                  id: 'sample-2',
                  title: 'Waste Reduction & Recycling Program',
                  location: 'Pune, India',
                  budget: '₹1.2 Cr',
                  status: 'in_review',
                  organization: 'EcoTech Solutions',
                  sdgFocus: ['11', '12', '13'],
                  description: 'Community-based waste management and recycling initiatives'
                }, {
                  id: 'sample-3',
                  title: 'Green Energy Initiative 2024',
                  location: 'Bengaluru, India',
                  budget: '₹2.4 Cr',
                  status: 'approved',
                  organization: 'Solar Power Corp',
                  sdgFocus: ['7', '13', '15'],
                  description: 'Solar panel installation and renewable energy education'
                }].map(sample => (
                  <button
                    key={sample.id}
                    className="w-full text-left rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all duration-200 hover-lift"
                    onClick={() => onSelect?.({
                      id: sample.id,
                      status: sample.status,
                      projectTitle: sample.title,
                      project: {
                        title: sample.title,
                        description: sample.description,
                        location: { city: sample.location },
                        region: sample.location,
                        financials: { currency: '₹', funding_required: sample.budget },
                        budget: sample.budget,
                        timeline: { start_date: '2024-04-01', end_date: '2025-03-31' },
                        start_date: '2024-04-01',
                        end_date: '2025-03-31',
                        organization: sample.organization,
                        ngo: { name: sample.organization },
                        sdg_focus: sample.sdgFocus,
                        sdgs: sample.sdgFocus
                      },
                      steps: [
                        { id: 1, name: 'Initial Review', status: 'approved', order: 1, assigneeRole: 'Project Manager' },
                        { id: 2, name: 'Budget Approval', status: sample.status === 'approved' ? 'approved' : 'pending', order: 2, assigneeRole: 'Finance Team' },
                        { id: 3, name: 'Compliance Check', status: 'pending', order: 3, assigneeRole: 'Legal Team' },
                        { id: 4, name: 'Final Approval', status: 'pending', order: 4, assigneeRole: 'Executive Board' }
                      ]
                    })}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium text-gray-900">{sample.title}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`}>
                        {getStatusIcon(sample.status)} {sample.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{sample.organization}</div>
                    <div className="text-xs text-gray-500">{sample.location} · {sample.budget} · SDG: {sample.sdgFocus.join(', ')}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}



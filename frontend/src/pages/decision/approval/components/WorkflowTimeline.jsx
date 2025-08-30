import { useEffect, useState } from 'react'
import { updateApprovalStepStatus } from '../../../../lib/projectApi'

function Step({ icon, title, desc, statusClass, badge, badgeColor, body, actions, isLast }) {
  return (
    <div className="relative flex items-start mb-12 workflow-step">
      {/* Step Icon */}
      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-4 ${statusClass} relative z-10 shadow-lg`}>
        <span className="text-xl">{icon}</span>
      </div>
      
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 timeline-connector"></div>
      )}
      
      {/* Step Content */}
      <div className="ml-6 flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-900 break-words text-wrap">{title}</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border flex-shrink-0 status-badge ${badgeColor?.bg || 'bg-gray-100'} ${badgeColor?.text || 'text-gray-600'}`}>
            <span className="flex items-center space-x-1">
              {badgeColor?.spinner ? (
                <div className={`w-4 h-4 border-2 ${badgeColor.border} border-t-transparent rounded-full animate-spin`} />
              ) : (
                badgeColor?.icon || null
              )}
              <span>{badge}</span>
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 break-words text-wrap">{desc}</p>
        
        <div className={`rounded-xl p-4 mb-4 border ${badgeColor?.bg || 'bg-gray-50'}`}>
          {body}
          {actions && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="step-actions">
                {actions}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function WorkflowTimeline({ approval }) {
  const [current, setCurrent] = useState(approval)
  const [updating, setUpdating] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    setCurrent(approval)
    setSuccessMessage(null)
  }, [approval])

  const updateStep = async (stepId, status) => {
    if (!current?.id) {
      alert('No approval selected')
      return
    }
    
    setUpdating(stepId)
    
    try {
      const data = await updateApprovalStepStatus(current.id, stepId, { status })
      
      if (data?.approval) {
        setCurrent(data.approval)
        setSuccessMessage(`Step ${status} successfully!`)
        setTimeout(() => setSuccessMessage(null), 3000)
      } else if (data?.step) {
        // Update the current approval with the new step data
        const updatedSteps = current.steps?.map(step => 
          step.id === stepId ? data.step : step
        ) || []
        setCurrent({ ...current, steps: updatedSteps })
        setSuccessMessage(`Step ${status} successfully!`)
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch (e) {
      console.error('Update step failed:', e)
      alert(`Failed to update step: ${e.message}`)
    } finally {
      setUpdating(null)
    }
  }

  const renderStatus = (status) => {
    const s = String(status || 'pending').toLowerCase()
    if (s === 'approved') return { 
      badge: 'Approved', 
      cls: 'bg-green-100 border-green-500 text-green-600', 
      color: { 
        bg: 'bg-green-50 border-green-200', 
        text: 'text-green-800', 
        icon: <span className="text-green-600">✅</span> 
      } 
    }
    if (s === 'rejected' || s === 'cancelled') return { 
      badge: 'Rejected', 
      cls: 'bg-red-100 border-red-500 text-red-600', 
      color: { 
        bg: 'bg-red-50 border-red-200', 
        text: 'text-red-800', 
        icon: <span className="text-red-600">❌</span> 
      } 
    }
    return { 
      badge: 'Pending', 
      cls: 'bg-gray-100 border-gray-300 text-gray-400', 
      color: { 
        bg: 'bg-gray-50 border-gray-200', 
        text: 'text-gray-600',
        spinner: true,
        border: 'border-gray-400'
      } 
    }
  }

  const getStepIcon = (stepName, index) => {
    const name = stepName?.toLowerCase() || ''
    if (name.includes('initial') || name.includes('review')) return '🔍'
    if (name.includes('budget') || name.includes('financial')) return '💰'
    if (name.includes('compliance') || name.includes('legal')) return '⚖️'
    if (name.includes('final') || name.includes('approval')) return '✅'
    if (name.includes('implementation') || name.includes('execution')) return '🚀'
    
    // Default icons based on order
    const icons = ['📋', '🔍', '💰', '⚖️', '✅', '🚀']
    return icons[index] || '📋'
  }

  const getStepDescription = (stepName) => {
    const name = stepName?.toLowerCase() || ''
    if (name.includes('initial')) return 'Initial project review and validation'
    if (name.includes('budget')) return 'Budget analysis and financial approval'
    if (name.includes('compliance')) return 'Compliance and regulatory checks'
    if (name.includes('final')) return 'Final approval and project authorization'
    if (name.includes('implementation')) return 'Project implementation and monitoring'
    return 'Review and decision step'
  }

  if (!current) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">📋</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Approval Workflow</h2>
          <p className="text-gray-600">Select a project to view its approval workflow</p>
        </div>
      </div>
    )
  }

  const steps = current.steps || []
  const defaultSteps = [
    { id: 1, name: 'Initial Review', order: 1, assigneeRole: 'Project Manager', status: 'pending' },
    { id: 2, name: 'Budget Approval', order: 2, assigneeRole: 'Finance Team', status: 'pending' },
    { id: 3, name: 'Compliance Check', order: 3, assigneeRole: 'Legal Team', status: 'pending' },
    { id: 4, name: 'Final Approval', order: 4, assigneeRole: 'Executive Board', status: 'pending' }
  ]

  const workflowSteps = steps.length > 0 ? steps : defaultSteps

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl">⚡</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Approval Workflow</h2>
          <p className="text-gray-600 text-sm sm:text-base">Step-by-step approval process</p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <div className="relative">
        {workflowSteps.map((step, idx) => {
          const st = renderStatus(step.status)
          const isLast = idx === workflowSteps.length - 1
          
          return (
            <Step
              key={step.id}
              icon={getStepIcon(step.name, idx)}
              title={step.name || `Step ${idx + 1}`}
              desc={getStepDescription(step.name)}
              statusClass={st.cls}
              badge={st.badge}
              badgeColor={st.color}
              isLast={isLast}
              body={
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm font-medium text-gray-700">Assignee:</span>
                    <span className="text-sm text-gray-900 break-words text-wrap">{step.assigneeRole || step.assigneeUserId || 'Unassigned'}</span>
                  </div>
                  {step.decisionNotes && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                      <p className="text-sm text-blue-800 break-words text-wrap">{step.decisionNotes}</p>
                    </div>
                  )}
                  {step.decidedAt && (
                    <div className="text-xs text-gray-500">
                      Decided: {new Date(step.decidedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              }
              actions={
                step.status !== 'approved' && step.status !== 'rejected' && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      onClick={() => updateStep(step.id, 'approved')}
                      disabled={updating === step.id}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-animate btn-responsive focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                      type="button"
                    >
                      {updating === step.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <span>✅</span>
                          Approve
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => updateStep(step.id, 'rejected')}
                      disabled={updating === step.id}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-animate btn-responsive focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                      type="button"
                    >
                      <span>❌</span>
                      Reject
                    </button>
                  </div>
                )
              }
            />
          )
        })}

        {/* Overall Status - Fixed responsive layout */}
        <div className="workflow-actions mt-8 pt-8 border-t border-gray-200">
          <div className="status-container">
            <div className={`px-4 py-2 rounded-full text-sm font-medium border flex-shrink-0 status-badge ${
              current.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
              current.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' :
              current.status === 'in_review' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              'bg-gray-100 text-gray-800 border-gray-200'
            }`}>
              <span className="flex items-center space-x-2">
                <span>
                  {current.status === 'approved' ? '✅' :
                   current.status === 'rejected' ? '❌' :
                   current.status === 'in_review' ? '⏳' : '📋'}
                </span>
                <span className="whitespace-nowrap">Overall: {current.status || 'Pending'}</span>
              </span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              className="px-4 sm:px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 btn-animate btn-responsive focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
              type="button"
              onClick={() => alert('Save Draft functionality coming soon!')}
            >
              <span>💾</span>
              <span className="whitespace-nowrap">Save Draft</span>
            </button>
            <button 
              className="px-4 sm:px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 btn-animate btn-responsive focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
              type="button"
              onClick={() => alert('Export Report functionality coming soon!')}
            >
              <span>📤</span>
              <span className="whitespace-nowrap">Export Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



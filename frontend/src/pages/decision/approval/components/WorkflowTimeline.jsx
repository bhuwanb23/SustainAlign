import { useEffect, useState } from 'react'

function Step({ icon, title, desc, statusClass, badge, badgeColor, body, actions }) {
  return (
    <div className="relative flex items-start mb-12">
      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-4 ${statusClass} relative z-10`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="ml-6 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        <div className={`rounded-lg p-4 mb-4 ${badgeColor?.bg || 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${badgeColor?.text || 'text-gray-600'}`}>Status: {badge}</span>
            {badgeColor?.spinner ? (
              <div className={`w-6 h-6 border-2 ${badgeColor.border} border-t-transparent rounded-full animate-spin`} />
            ) : (
              badgeColor?.icon || null
            )}
          </div>
          {body}
          {actions}
        </div>
      </div>
    </div>
  )
}

export default function WorkflowTimeline({ approval }) {
  const [current, setCurrent] = useState(approval)

  useEffect(() => {
    setCurrent(approval)
  }, [approval])

  const updateStep = async (stepId, status) => {
    if (!current?.id) return
    try {
      const res = await fetch(`/api/approvals/${current.id}/steps/${stepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to update step')
      if (data?.approval) setCurrent(data.approval)
    } catch (e) {
      console.error('Update step failed', e)
      alert('Failed to update step')
    }
  }

  const renderStatus = (status) => {
    const s = String(status || 'pending').toLowerCase()
    if (s === 'approved') return { badge: 'Approved', cls: 'bg-green-100 border-green-500 text-green-600', color: { bg: 'bg-green-50', text: 'text-green-800', icon: <span className="text-green-600">✓</span> } }
    if (s === 'rejected' || s === 'cancelled') return { badge: 'Rejected', cls: 'bg-red-100 border-red-500 text-red-600', color: { bg: 'bg-red-50', text: 'text-red-800', icon: <span className="text-red-600">✕</span> } }
    return { badge: 'Pending', cls: 'bg-gray-100 border-gray-300 text-gray-400', color: { bg: 'bg-gray-50', text: 'text-gray-600' } }
  }

  return (
    <section className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Approval Workflow</h2>
        {!current && (
          <div className="text-sm text-gray-600">Select an approved project to view its workflow.</div>
        )}
        <div className="relative">
          <div className="absolute left-8 top-16 bottom-0 w-0.5 progress-line step-active" />
          {(current?.steps || []).map((s, idx) => {
            const st = renderStatus(s.status)
            return (
              <Step
                key={s.id}
                icon={idx === 0 ? '🍃' : idx === 1 ? '🤝' : '✔️'}
                title={s.name || `Step ${idx+1}`}
                desc={`Order ${s.order}`}
                statusClass={st.cls}
                badge={st.badge}
                badgeColor={st.color}
                body={<p className="text-sm text-gray-600">Assignee: {s.assigneeRole || s.assigneeUserId || 'Unassigned'}</p>}
                actions={
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => updateStep(s.id, 'approved')} className="px-3 py-1.5 rounded bg-green-600 text-white text-xs hover:bg-green-700">Approve</button>
                    <button onClick={() => updateStep(s.id, 'rejected')} className="px-3 py-1.5 rounded bg-red-600 text-white text-xs hover:bg-red-700">Reject</button>
                  </div>
                }
              />
            )
          })}

          <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-200" id="action-buttons">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105">
              💾 Save Draft
            </button>
            {current?.status && (
              <span className="text-sm text-gray-700">Overall status: {current.status}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}



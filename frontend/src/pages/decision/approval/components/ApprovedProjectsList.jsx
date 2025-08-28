import { useEffect, useMemo, useState } from 'react'
import { getApprovals, getProject } from '../../../../lib/projectApi'

export default function ApprovedProjectsList({ onSelect, selectedApprovalId }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
            if (!projectTitle && a.project_id) {
              try {
                const p = await getProject(a.project_id)
                projectTitle = p.title
              } catch (_) {}
            }
            return { ...a, projectTitle }
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

  const accepted = useMemo(() => items.filter(i => (i.status || '').toLowerCase() === 'approved' || (i.status || '').toLowerCase() === 'accepted'), [items])

  if (loading) {
    return (
      <aside className="space-y-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">Loading approved projects…</div>
      </aside>
    )
  }

  if (error) {
    return (
      <aside className="space-y-3">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 text-red-700">{error}</div>
      </aside>
    )
  }

  return (
    <aside className="space-y-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Approved Projects</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {accepted.map((a) => (
            <li key={a.id}>
              <button
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${selectedApprovalId === a.id ? 'bg-blue-50' : ''}`}
                onClick={() => onSelect?.(a)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{a.projectTitle || a.title || 'Project'}</p>
                    <p className="text-xs text-gray-600">Approval #{a.id}{a.company_id ? ` · Company ${a.company_id}` : ''}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">{a.status || 'approved'}</span>
                </div>
              </button>
            </li>
          ))}
          {accepted.length === 0 && (
            <li className="px-4 py-4">
              <div className="text-sm text-gray-700 mb-3">No approved projects yet. Sample projects:</div>
              <div className="space-y-3">
                {[{
                  id: 'sample-1',
                  title: 'Green Energy Initiative 2024',
                  location: 'Bengaluru, India',
                  budget: 'INR 2.4 Cr',
                }, {
                  id: 'sample-2',
                  title: 'Waste Reduction & Recycling Program',
                  location: 'Pune, India',
                  budget: 'INR 1.2 Cr',
                }].map(s => (
                  <button
                    key={s.id}
                    className="w-full text-left rounded-lg border border-gray-200 p-3 hover:border-blue-300 hover:bg-blue-50/40"
                    onClick={() => onSelect?.({ id: s.id, status: 'approved', projectTitle: s.title, project: { title: s.title, location: { city: s.location }, financials: { currency: 'INR', funding_required: s.budget }, timeline: { start_date: '2024-04-01', end_date: '2025-03-31' } } })}
                  >
                    <div className="text-sm font-medium text-gray-900">{s.title}</div>
                    <div className="text-xs text-gray-600">{s.location} · Budget {s.budget}</div>
                  </button>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}



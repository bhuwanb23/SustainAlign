export default function ProjectDetails({ project, onClose }) {
  if (!project) return null

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2 text-sm text-gray-700">{children}</div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[9998]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-3xl bg-gray-50 shadow-2xl border-l border-gray-200 z-[9999] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 bg-white/90 backdrop-blur flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                 style={{ background: `linear-gradient(90deg, ${project.gradientFrom || '#10B981'}, ${project.gradientTo || '#059669'})` }}>{project.icon || '📁'}</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{project.title || 'Project Title'}</h2>
              <p className="text-xs text-gray-500">{project.subtitle || 'NGO / Implementing Partner'}</p>
            </div>
          </div>
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white shadow-sm hover:bg-gray-50">Close</button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <Section title="1. Project Basics">
            <p><span className="font-medium">Project Title:</span> {project.title || '—'}</p>
            <p><span className="font-medium">NGO / Implementing Partner:</span> {project.ngo || project.subtitle || '—'}</p>
            <p><span className="font-medium">Sector:</span> {project.sector || project.metricLabel || '—'}</p>
            <p><span className="font-medium">SDGs:</span> {(project.sdgs || project.sdg || []).join(', ') || '—'}</p>
            <p><span className="font-medium">Location / Region:</span> {project.region || project.location || '—'}</p>
          </Section>

          <Section title="2. Timeline & Milestones">
            <p><span className="font-medium">Start Date – End Date:</span> {project.start || '—'} – {project.end || '—'}</p>
            <p><span className="font-medium">Current Phase:</span> {project.phase || '—'}</p>
            <div className="flex items-center gap-3">
              <span className="font-medium">Milestone Progress:</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${project.progressPct || 0}%` }} />
              </div>
              <span className="text-xs text-gray-600">{project.milestoneSummary || `${project.completedMilestones || 0}/${project.totalMilestones || 0} completed`}</span>
            </div>
            <p><span className="font-medium">Next Milestone & Due Date:</span> {project.nextMilestone || '—'} {project.nextDue ? `· ${project.nextDue}` : ''}</p>
          </Section>

          <Section title="3. Budget & Financials">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <div className="text-xs text-emerald-700">Allocated</div>
                <div className="text-base font-semibold text-emerald-800">{project.allocated || project.budget || '—'}</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-xs text-blue-700">Spent</div>
                <div className="text-base font-semibold text-blue-800">{project.spent || '—'}</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="text-xs text-amber-700">Remaining</div>
                <div className="text-base font-semibold text-amber-800">{project.remaining || '—'}</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="text-xs text-purple-700">% Utilized</div>
                <div className="text-base font-semibold text-purple-800">{project.utilizedPct != null ? `${project.utilizedPct}%` : (project.progressPct != null ? `${project.progressPct}%` : '—')}</div>
              </div>
            </div>
          </Section>

          <Section title="4. Impact Metrics (Dynamic KPIs)">
            <ul className="list-disc pl-5 space-y-1">
              {(project.kpis || [
                'Students Educated: —',
                'CO₂ Reduced: —',
                'Water Conserved: —',
                'Employment Generated: —',
              ]).map((k, i) => (
                <li key={i}>{typeof k === 'string' ? k : `${k.label}: ${k.value}`}</li>
              ))}
            </ul>
          </Section>

          <Section title="5. Status & Alerts">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-3">
                <div className="text-xs">Current Status</div>
                <div className="font-semibold">{project.statusText || project.badge?.text || '—'}</div>
              </div>
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-lg p-3">
                <div className="text-xs">Issues Raised</div>
                <div className="font-semibold">{project.issues || '—'}</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 md:col-span-1">
                <div className="text-xs">AI Suggestions</div>
                <div className="font-semibold">{project.aiSuggestions || 'No critical risks detected.'}</div>
              </div>
            </div>
          </Section>

          <Section title="6. Supporting Data">
            <p><span className="font-medium">Latest NGO Report:</span> {project.latestReport || '—'}</p>
            <p><span className="font-medium">Evidence Links:</span> {(project.evidenceLinks || []).length ? (
              <span className="space-x-2">{project.evidenceLinks.map((l, i) => <a key={i} href={l} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">Link {i+1}</a>)}</span>
            ) : '—'}</p>
            <p><span className="font-medium">Verification Status:</span> {project.verification || '—'}</p>
          </Section>
        </div>
      </div>
    </div>
  )
}



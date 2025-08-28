export default function ProjectHeader({ selected }) {
  const title = selected?.projectTitle || selected?.project?.title || 'Select a project'
  const budget = selected?.project?.financials
    ? `${selected.project.financials.currency} ${selected.project.financials.funding_required}`
    : '—'
  const start = selected?.project?.timeline?.start_date || '—'
  const end = selected?.project?.timeline?.end_date || '—'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 truncate">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">Timeline: {start} – {end}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xs text-gray-500">Budget</div>
          <div className="text-lg font-semibold text-gray-900">{budget}</div>
        </div>
      </div>
    </div>
  )
}



export default function ProjectTrackerPage() {
  const milestones = [
    { date: '2025-01-10', title: 'Kickoff', status: 'Done' },
    { date: '2025-02-01', title: 'Site Survey', status: 'In Progress' },
    { date: '2025-03-15', title: 'Procurement', status: 'Pending' },
  ]
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Project Tracker</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <ul className="space-y-3">
          {milestones.map((m) => (
            <li key={m.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-semibold text-gray-900">{m.title}</div>
                <div className="text-sm text-gray-600">{m.date}</div>
              </div>
              <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">{m.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}



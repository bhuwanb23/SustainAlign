export default function MatchingEnginePage() {
  const matches = [
    { title: 'Water for All', status: 'Proposed' },
    { title: 'Solar Schools', status: 'Match' },
  ]
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Matching Engine</h1>
      <div className="space-y-3">
        {matches.map((m) => (
          <div key={m.title} className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex items-center justify-between">
            <span className="text-gray-900 font-medium">{m.title}</span>
            <div className="space-x-2">
              <button className="px-3 py-1 rounded-xl bg-emerald-600 text-white">Accept</button>
              <button className="px-3 py-1 rounded-xl bg-red-500 text-white">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



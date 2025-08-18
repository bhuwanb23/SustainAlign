export default function MatchList({ items }) {
  const badge = (score) => score > 80 ? 'bg-emerald-50 text-emerald-700' : score > 60 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <div className="font-semibold text-gray-900">{m.title}</div>
            <div className="text-sm text-gray-600">{m.ngo}</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${badge(m.score)}`}>Alignment {m.score}%</span>
        </div>
      ))}
    </div>
  )
}



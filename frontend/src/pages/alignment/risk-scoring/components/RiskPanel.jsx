export default function RiskPanel({ items }) {
  const color = (level) => level === 'Low' ? 'text-emerald-700 bg-emerald-50' : level === 'Medium' ? 'text-yellow-700 bg-yellow-50' : 'text-red-700 bg-red-50'
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-3">
      {items.map((i) => (
        <div key={i.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="text-gray-900 font-medium">{i.label}</div>
          <span className={`px-3 py-1 rounded-full text-sm ${color(i.level)}`}>{i.level}</span>
        </div>
      ))}
    </div>
  )
}



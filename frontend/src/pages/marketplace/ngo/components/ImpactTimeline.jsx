export default function ImpactTimeline({ items }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Impact Timeline</h3>
      <div className="space-y-6">
        {items.map((it) => (
          <div key={it.year} className="flex items-start space-x-4 border-l-4 border-emerald-400 pl-6 pb-6">
            <div className="bg-emerald-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">{it.year}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-2">{it.title}</h4>
              <p className="text-gray-600 mb-3">{it.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {it.metrics.map((m) => (
                  <div key={m.label} className={`${m.bg} p-3 rounded-lg`}>
                    <div className={`font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-gray-600">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



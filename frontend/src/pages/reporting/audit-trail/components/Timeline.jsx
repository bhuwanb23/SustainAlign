function DetailCard({ card }) {
  if (!card) return null
  return (
    <div className={`rounded-xl p-6 border ${card.cardBg} ${card.cardBorder}`}>
      <h4 className={`font-semibold mb-3 ${card.titleColor}`}>{card.title}</h4>
      <div className="space-y-3 text-sm">
        {card.items.map(([k, v]) => (
          <div key={k}><strong>{k}:</strong> {v}</div>
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ e, expanded, onToggle }) {
  const gradientFrom = e.borderColor.includes('blue') ? 'from-blue-500 to-blue-600' : e.borderColor.includes('red') ? 'from-red-500 to-red-600' : 'from-emerald-500 to-emerald-600'
  return (
    <div className="relative pl-20 cursor-pointer hover:scale-[1.02] transition-transform">
      <div className={`absolute left-4 w-8 h-8 bg-gradient-to-r ${gradientFrom} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}></div>
      <div
        className={`bg-white rounded-2xl border-l-4 ${e.borderColor} p-6 shadow-lg hover:shadow-xl transition-shadow`}
        onClick={() => onToggle(e.id)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 ${e.chipBg} ${e.chipText} rounded-full text-sm font-medium`}>{e.badgeText}</span>
            <span className="text-sm text-gray-500">{e.timeAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 ${e.statusDot} rounded-full`}></span>
            <span className={`text-sm font-medium ${e.statusColor}`}>{e.statusText}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{e.title}</h3>
        <p className="text-gray-600 mb-3">{e.summary}</p>
        <div className="flex items-center text-sm text-gray-500">{e.meta}</div>
      </div>
      {expanded}
    </div>
  )
}

export default function Timeline({ entries, details, expandedId, toggle }) {
  return (
    <section className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, #10b981, #3b82f6, #ef4444)' }}></div>
      <div className="space-y-6">
        {entries.map((e) => (
          <div key={e.id}>
            <TimelineItem
              e={e}
              onToggle={toggle}
              expanded={expandedId === e.id ? (
                <div className="pl-20 mb-6">
                  <DetailCard card={details[e.id]} />
                </div>
              ) : null}
            />
          </div>
        ))}
      </div>
    </section>
  )
}



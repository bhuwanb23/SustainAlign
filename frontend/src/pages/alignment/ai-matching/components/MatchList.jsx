export default function MatchList({ items }) {
  return (
    <div className="space-y-6">
      {items.map((m) => (
        <article key={m.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{m.title}</h3>
                <div className="ml-4 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {m.alignmentScore}%
                </div>
              </div>
              <p className="text-gray-600 mb-3">{m.summary}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>💲 {m.investmentRange}</span>
                <span>🕒 {m.timeline}</span>
                <span>📍 {m.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {m.tags?.map((t, idx) => (
                <div key={idx} className={`w-8 h-8 ${t.bg} rounded-full flex items-center justify-center`}>
                  <span className={`${t.fg} text-sm`}>{t.icon}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">View Details</button>
              <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">Save</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}



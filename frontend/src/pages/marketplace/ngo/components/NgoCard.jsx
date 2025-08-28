export default function NgoCard({ ngo, onSelect }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-all p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl">{ngo.icon || '🏛️'}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{ngo.name}</h3>
            <p className="text-sm text-gray-600">{ngo.sector} · {ngo.location}</p>
          </div>
        </div>
        <div className="text-sm font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{ngo.rating}★</div>
      </div>
      <p className="text-gray-700 text-sm mt-3 line-clamp-2">{ngo.summary}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1">
          {(ngo.focus || []).slice(0,3).map((t, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{t}</span>
          ))}
        </div>
        <button onClick={() => onSelect && onSelect(ngo)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">View Profile</button>
      </div>
    </div>
  )
}



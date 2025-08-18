export default function SdgGrid({ sdgs, selected, toggle }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {sdgs.map((s) => (
        <label key={s} className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer ${selected.includes(s) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
          <input type="checkbox" className="accent-emerald-600" checked={selected.includes(s)} onChange={() => toggle(s)} />
          <span className="text-gray-800">{s}</span>
        </label>
      ))}
    </div>
  )
}



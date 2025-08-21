export default function EsgCards({ categories, selectedKeys, onToggle }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {categories.map((c) => {
        const checked = selectedKeys.includes(c.key)
        const ringClass = checked ? 'border-opacity-100' : ''
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onToggle(c.key)}
            className={`esg-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent ${c.hoverBorderClass} ${ringClass}`}
            aria-pressed={checked}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{c.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{c.label}</h3>
              <p className="text-slate-600 text-sm">{c.description}</p>
              <div className="mt-4 flex items-center justify-center">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  checked ? 'bg-slate-50' : ''
                }`}>
                  <span className={`${checked ? 'block' : 'hidden'}`}>✓</span>
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}



const COLOR_MAP = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
}

export default function ParsedCard({ icon, badge, title, value, description, color = 'blue' }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${c.bg} rounded-lg flex items-center justify-center`}>
          <span className={`${c.text} text-xl`}>{icon}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{badge}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}



import Icon from './Icon.jsx'

const colorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
}

export default function QuickStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl shadow-lg shadow-emerald-50 p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
              <p className={`${colorMap[stat.color].text} text-sm mt-1`}>{stat.trend}</p>
            </div>
            <div className={`w-12 h-12 ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center ring-4 ring-white`}>
              <Icon name={stat.icon} className={`${colorMap[stat.color].text} text-lg`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}



import Icon from './Icon.jsx'

const colorClass = {
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  yellow: 'bg-yellow-600',
}

export default function ActiveProjects({ projects }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
        <button className="text-emerald-700 hover:text-emerald-800 font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 ${colorClass[p.color]} rounded-xl flex items-center justify-center shadow-sm text-white`}>
                <Icon name={p.icon} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{p.title}</h4>
                <p className="text-sm text-gray-600">{p.sdg}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{p.amount}</p>
              <p className={`text-sm ${p.status === 'On track' ? 'text-green-600' : p.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>{p.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



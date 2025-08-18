import Icon from './Icon.jsx'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/90 backdrop-blur border-r border-gray-200 shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
            <Icon name="leaf" className="text-white text-lg" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">EcoImpact</h1>
        </div>
      </div>

      <nav className="mt-4">
        <span className="flex items-center px-6 py-3 text-emerald-700 bg-emerald-50/70 cursor-pointer">
          <Icon name="chart-line" className="mr-3" />
          <span className="font-medium">Dashboard</span>
        </span>
        <span className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
          <Icon name="folder-open" className="mr-3" />
          <span>Projects</span>
        </span>
        <span className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
          <Icon name="wallet" className="mr-3" />
          <span>Budget</span>
        </span>
        <span className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
          <Icon name="shield-halved" className="mr-3" />
          <span>Compliance</span>
        </span>
        <span className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
          <Icon name="chart-pie" className="mr-3" />
          <span>Reports</span>
        </span>
      </nav>
    </aside>
  )
}



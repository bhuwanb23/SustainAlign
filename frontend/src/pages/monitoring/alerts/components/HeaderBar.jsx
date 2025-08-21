export default function HeaderBar({ lastUpdated }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">🛡️</div>
            <h1 className="text-xl font-bold text-gray-900">CSR Control Center</h1>
          </div>
          <div className="text-sm text-gray-500">/ Risk Alerts Dashboard</div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-700">Live Monitoring</span>
          </div>
          <div className="text-sm text-gray-500">Last updated: {lastUpdated}</div>
        </div>
      </div>
    </div>
  )
}



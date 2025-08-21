export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌿</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">CSR Dashboard</h1>
              <p className="text-sm text-gray-500">Upload Historical Data</p>
            </div>
          </div>
          <nav className="flex items-center space-x-6">
            <span className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">Dashboard</span>
            <span className="text-emerald-600 font-medium cursor-pointer">Upload</span>
            <span className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">Reports</span>
          </nav>
        </div>
      </div>
    </header>
  )
}



export default function HeaderBar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌿</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">EcoFlow Approval</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Project #2024-ENV-001</span>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-8 h-8 rounded-full" alt="User" />
          </div>
        </div>
      </div>
    </header>
  )
}



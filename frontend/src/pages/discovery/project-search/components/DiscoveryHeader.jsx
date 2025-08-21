export default function DiscoveryHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0891b2 100%)' }}>
              <span className="text-white text-lg">🌿</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-800">Project Discovery</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <span className="text-gray-600 hover:text-emerald-700 transition-colors cursor-pointer">Dashboard</span>
            <span className="text-gray-600 hover:text-emerald-700 transition-colors cursor-pointer">My Projects</span>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-10 h-10 rounded-full border-2 border-emerald-200" />
          </nav>
        </div>
      </div>
    </header>
  )
}



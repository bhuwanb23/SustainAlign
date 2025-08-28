export default function HeaderBar({ header, onBack }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button onClick={onBack} className="mr-2 px-3 py-1.5 text-sm rounded-lg border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50">← Back</button>
            )}
            <img className="w-12 h-12 rounded-full object-cover" src={header.logo} alt="NGO logo" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{header.name}</h1>
              <p className="text-sm text-gray-600">Verified NGO</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-emerald-400 text-white px-3 py-1 rounded-full text-sm font-medium">{header.status}</span>
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">❤️ Support</button>
          </div>
        </div>
      </div>
    </header>
  )
}



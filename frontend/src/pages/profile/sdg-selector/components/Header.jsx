export default function Header({ isConfirmEnabled, onConfirm }) {
  return (
    <div className="bg-white shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌐</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">ESG/SDG Selector</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Select your priority goals</span>
            <button
              type="button"
              disabled={!isConfirmEnabled}
              onClick={onConfirm}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



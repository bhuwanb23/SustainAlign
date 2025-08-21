export default function Sidebar({ esgSelected, esgPercent, sdgSelected, renderSdgPill }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
        <span className="text-blue-600 mr-2">🎯</span>
        Selected Goals
      </h3>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-600 mb-3">ESG Categories</h4>
        <div className="space-y-2 text-sm text-slate-500">
          {esgSelected.length === 0 ? (
            <div className="text-slate-400">No ESG categories selected</div>
          ) : (
            esgSelected.map((key) => (
              <div key={key} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <span className="capitalize">{key}</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{esgPercent}%</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-600 mb-3">SDG Goals</h4>
        <div className="space-y-2 text-sm text-slate-500">
          {sdgSelected.length === 0 ? (
            <div className="text-slate-400">No SDG goals selected</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {sdgSelected.map((id) => (
                <div key={id} className="flex items-center">{renderSdgPill(id)}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center text-blue-700 mb-2">
          <span className="mr-2">💡</span>
          <span className="text-sm font-medium">Pro Tip</span>
        </div>
        <p className="text-xs text-blue-600">Select 3-5 goals for optimal focus and impact measurement.</p>
      </div>
    </div>
  )
}



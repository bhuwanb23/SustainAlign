export default function CsrFocusBar({ sdgSelected, renderSdgPill }) {
  if (sdgSelected.length === 0) return null
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 z-50">
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-slate-700">Your CSR Focus:</span>
        <div className="flex space-x-2">
          {sdgSelected.slice(0, 6).map((id) => (
            <div key={id}>{renderSdgPill(id)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}



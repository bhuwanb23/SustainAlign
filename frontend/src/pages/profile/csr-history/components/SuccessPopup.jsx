export default function SuccessPopup({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-emerald-500 p-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">Report Uploaded Successfully</p>
          <p className="text-sm text-gray-600">AI analysis completed</p>
        </div>
        <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  )
}



export default function ConfirmationModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-white text-3xl">🌐</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Goals Confirmed!</h3>
        <p className="text-slate-600 mb-6">Your ESG/SDG priorities have been successfully set. You're now aligned with global sustainability targets.</p>
        <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Continue to Dashboard</button>
      </div>
    </div>
  )
}



export default function CelebrationModal({ open, onClose }) {
  if (!open) return null
  return (
    <div id="celebration-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 celebration">
        <div className="plant-grow">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h3>
          <p className="text-gray-600 mb-6">Your CSR profile has been successfully created. Together, we'll cultivate positive change!</p>
          <button onClick={onClose} className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition-colors">
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}



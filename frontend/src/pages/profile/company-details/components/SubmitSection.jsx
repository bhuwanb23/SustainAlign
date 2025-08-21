export default function SubmitSection({ onSubmit }) {
  return (
    <div id="submit-section" className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-center">
      <button
        type="button"
        onClick={onSubmit}
        className="bg-white text-green-600 font-bold py-4 px-12 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        <span className="mr-2">🌱</span>
        Complete CSR Profile Setup
      </button>
      <p className="text-green-100 mt-4">Ready to make a positive impact? Let's grow together! 🌱</p>
    </div>
  )
}



export default function FloatingActions() {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
      <button className="w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">📄</button>
      <button className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">🧮</button>
      <button className="w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">📊</button>
    </div>
  )
}



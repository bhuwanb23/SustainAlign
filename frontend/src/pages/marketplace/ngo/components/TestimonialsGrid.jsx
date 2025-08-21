function Stars({ count }) {
  return (
    <div className="flex text-yellow-400 mt-4" aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>⭐</span>
      ))}
    </div>
  )
}

export default function TestimonialsGrid({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((t) => (
        <div key={t.name} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-600">{t.role}</p>
            </div>
          </div>
          <p className="text-gray-700 italic">{t.quote}</p>
          <Stars count={t.stars} />
        </div>
      ))}
    </div>
  )
}



export default function CertificatesGrid({ items }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((c) => (
        <div key={c.title} className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className={`w-16 h-16 ${c.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <span className={`${c.color} text-2xl`}>{c.icon}</span>
          </div>
          <h4 className="font-semibold mb-2">{c.title}</h4>
          <p className="text-sm text-gray-600 mb-4">{c.desc}</p>
          <span className={`px-3 py-1 rounded-full text-sm ${c.bg} ${c.color.replace('text-', 'text-')}`}>{c.valid}</span>
        </div>
      ))}
    </div>
  )
}



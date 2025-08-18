export default function NotificationsFeed({ items }) {
  const color = (t) => t==='critical'?'bg-red-50 text-red-700':t==='warning'?'bg-yellow-50 text-yellow-700':'bg-blue-50 text-blue-700'
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Notifications & Alerts</h3>
      <div className="space-y-2">
        {items.map((n, idx) => (
          <div key={idx} className={`p-3 rounded-xl flex items-center justify-between ${color(n.type)}`}>
            <span className="font-medium">{n.text}</span>
            <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full">{n.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}



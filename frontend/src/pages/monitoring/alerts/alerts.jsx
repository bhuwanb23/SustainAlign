export default function MonitoringAlertsPage() {
  const alerts = [
    { title: 'Annual Report Due', type: 'Critical' },
    { title: 'Budget Overrun Risk', type: 'Warning' },
    { title: 'Milestone Delayed', type: 'Info' },
  ]
  const color = (t) => t === 'Critical' ? 'bg-red-50 text-red-700' : t === 'Warning' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700'
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Alerts</h1>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.title} className={`p-4 rounded-xl ${color(a.type)} flex items-center justify-between`}>
            <span className="font-medium">{a.title}</span>
            <span className="text-sm px-2 py-1 rounded-full bg-white/70">{a.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}



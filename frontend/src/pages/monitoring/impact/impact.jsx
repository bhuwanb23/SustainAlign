export default function ImpactDashboardPage() {
  const kpis = [
    { label: 'CO₂ Saved', value: '1,200t' },
    { label: 'Children Educated', value: '10,500' },
    { label: 'Water Conserved', value: '5.2M L' },
  ]
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Impact Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="text-sm text-gray-600">{k.label}</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}



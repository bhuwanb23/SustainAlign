export default function KpiStrip() {
  const items = [
    { label: 'Total Investment', value: '$2.4M', gradient: 'from-emerald-500 to-emerald-600' },
    { label: 'Expected Impact', value: '8.5K', gradient: 'from-sky-500 to-teal-500' },
    { label: 'CO₂ Reduction', value: '1.2K tons', gradient: 'from-teal-500 to-emerald-500' },
    { label: 'Risk Score', value: '2.3/5', gradient: 'from-emerald-600 to-emerald-700' },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((k) => (
        <div key={k.label} className={`bg-gradient-to-r ${k.gradient} rounded-xl p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">{k.label}</p>
              <p className="text-2xl font-bold">{k.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}



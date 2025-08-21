function Row({ icon, label, pct, barClass }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${barClass} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm text-gray-600">{pct}%</span>
            </div>
        </div>
    )
}

export default function SustainabilityKpis() {
    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Sustainability KPIs</h3>
            <div className="space-y-6">
                <Row icon={<span className="text-pink-500">👩‍🦰</span>} label="Women Empowered" pct={75} barClass="bg-pink-500 w-3/4" />
                <Row icon={<span className="text-green-600">⛰️</span>} label="Rural Development" pct={82} barClass="bg-green-500 w-4/5" />
                <Row icon={<span className="text-red-500">❤️</span>} label="Healthcare Reach" pct={68} barClass="bg-red-500 w-3/5" />
                <Row icon={<span className="text-orange-500">🛠️</span>} label="Skill Training" pct={91} barClass="bg-orange-500 w-5/6" />
            </div>
        </section>
    )
}



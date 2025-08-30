import useCounter from '../hooks/useCounter'

function Card({ icon, accentBg, accentText, label, value, suffix, loading = false }) {
    const numeric = useCounter(value || 0)
    return (
        <div className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${accentBg} rounded-xl flex items-center justify-center`}>{icon}</div>
                <span className={`text-sm font-medium ${accentText}`}>+12% this month</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{label}</h3>
            {loading ? (
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            ) : (
                <>
                    <p className="text-3xl font-bold text-gray-800">{numeric.toLocaleString()}</p>
                    {suffix && <p className="text-sm text-gray-500">{suffix}</p>}
                </>
            )}
        </div>
    )
}

export default function OverviewCards({ snapshot, loading }) {
    const cards = [
        {
            icon: <span className="text-green-600 text-xl">🌱</span>,
            accentBg: "bg-green-100",
            accentText: "text-green-600",
            label: "CO₂ Reduced",
            value: snapshot?.co2_reduced_tons || 0,
            suffix: "tons"
        },
        {
            icon: <span className="text-emerald-600 text-xl">🌳</span>,
            accentBg: "bg-emerald-100",
            accentText: "text-emerald-600",
            label: "Trees Planted",
            value: snapshot?.trees_planted || 0,
            suffix: "trees"
        },
        {
            icon: <span className="text-blue-600 text-xl">🎓</span>,
            accentBg: "bg-blue-100",
            accentText: "text-blue-600",
            label: "Beneficiaries",
            value: snapshot?.beneficiaries || 0,
            suffix: "people"
        },
        {
            icon: <span className="text-cyan-600 text-xl">💧</span>,
            accentBg: "bg-cyan-100",
            accentText: "text-cyan-600",
            label: "Water Saved",
            value: snapshot?.water_saved_liters || 0,
            suffix: "liters"
        }
    ]

    return (
        <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        accentBg={card.accentBg}
                        accentText={card.accentText}
                        label={card.label}
                        value={card.value}
                        suffix={card.suffix}
                        loading={loading}
                    />
                ))}
            </div>
        </section>
    )
}



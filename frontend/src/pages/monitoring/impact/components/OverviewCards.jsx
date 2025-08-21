import useCounter from '../hooks/useCounter'

function Card({ icon, accentBg, accentText, label, value, suffix }) {
    const numeric = useCounter(value)
    return (
        <div className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${accentBg} rounded-xl flex items-center justify-center`}>{icon}</div>
                <span className={`text-sm font-medium ${accentText}`}>+12% this month</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{label}</h3>
            <p className="text-3xl font-bold text-gray-800">{numeric.toLocaleString()}</p>
            {suffix && <p className="text-sm text-gray-500">{suffix}</p>}
        </div>
    )
}

export default function OverviewCards() {
    return (
        <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card icon={<span className="text-green-600 text-xl">🌱</span>} accentBg="bg-green-100" accentText="text-green-600" label="CO₂ Reduced" value={2450} suffix="tons" />
                <Card icon={<span className="text-emerald-600 text-xl">🌳</span>} accentBg="bg-emerald-100" accentText="text-emerald-600" label="Trees Planted" value={15750} suffix="trees" />
                <Card icon={<span className="text-blue-600 text-xl">🎓</span>} accentBg="bg-blue-100" accentText="text-blue-600" label="Students Educated" value={8920} suffix="students" />
                <Card icon={<span className="text-cyan-600 text-xl">💧</span>} accentBg="bg-cyan-100" accentText="text-cyan-600" label="Water Saved" value={125000} suffix="liters" />
            </div>
        </section>
    )
}



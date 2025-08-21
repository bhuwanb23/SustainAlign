function Item({ label, color, icon }) {
    return (
        <div className={`flex items-center justify-between p-3 ${color} rounded-lg`}>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-lg">{icon}</span>
        </div>
    )
}

export default function MonthlyGoals() {
    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Goals</h3>
            <div className="space-y-4">
                <Item label="Plant 2,000 Trees" color="bg-green-50" icon={<span className="text-green-500">✅</span>} />
                <Item label="Educate 1,500 Students" color="bg-blue-50" icon={<span className="text-blue-500">🕒</span>} />
                <Item label="Save 50,000L Water" color="bg-yellow-50" icon={<span className="text-yellow-500">🕒</span>} />
            </div>
        </section>
    )
}



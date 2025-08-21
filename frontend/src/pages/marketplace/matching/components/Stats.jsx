function Stat({ icon, colorBg, colorText, value, label }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`w-12 h-12 ${colorBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <span className={`${colorText} text-xl`}>{icon}</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
            <p className="text-gray-600 text-sm">{label}</p>
        </div>
    )
}

export default function Stats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Stat icon="🤝" colorBg="bg-green-100" colorText="text-green-600" value="47" label="Active Matches" />
            <Stat icon="💵" colorBg="bg-blue-100" colorText="text-blue-600" value="$2.4M" label="Total Funding" />
            <Stat icon="👥" colorBg="bg-purple-100" colorText="text-purple-600" value="156" label="NGO Partners" />
            <Stat icon="📈" colorBg="bg-yellow-100" colorText="text-yellow-600" value="89%" label="Success Rate" />
        </div>
    )
}



function Item({ label, color, icon }) {
    return (
        <div className={`flex items-center justify-between p-3 ${color} rounded-lg`}>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-lg">{icon}</span>
        </div>
    )
}

export default function MonthlyGoals({ goals, loading }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'on_track': return 'text-green-600 bg-green-100'
            case 'at_risk': return 'text-yellow-600 bg-yellow-100'
            case 'off_track': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'on_track': return '✅'
            case 'at_risk': return '⚠️'
            case 'off_track': return '❌'
            default: return '📊'
        }
    }

    if (loading) {
        return (
            <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="text-green-600 mr-3">🎯</span>Monthly Goals
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-green-600 mr-3">🎯</span>Monthly Goals
            </h3>
            <div className="space-y-4">
                {goals && goals.length > 0 ? (
                    goals.slice(0, 5).map((goal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-800 capitalize">
                                    {goal.metric.replace(/_/g, ' ')}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {goal.current} / {goal.target}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                                <span className="mr-1">{getStatusIcon(goal.status)}</span>
                                {goal.status.replace(/_/g, ' ')}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No goals data available</p>
                        <p className="text-sm">Goals will appear here when configured</p>
                    </div>
                )}
            </div>
        </section>
    )
}



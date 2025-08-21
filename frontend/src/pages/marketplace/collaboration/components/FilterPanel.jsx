export default function FilterPanel() {
    return (
        <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Filter Projects</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">SDG Categories</label>
                        <div className="space-y-2">
                            {[
                                ['🌱 Climate Action','text-green-600'],
                                ['💧 Clean Water','text-blue-600'],
                                ['📚 Education','text-purple-600'],
                                ['🏥 Healthcare','text-red-600'],
                            ].map(([label,color])=> (
                                <label key={label} className="flex items-center">
                                    <input type="checkbox" className="rounded" />
                                    <span className={`ml-2 text-sm ${color}`}>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Budget Range</label>
                        <select className="w-full p-3 border border-gray-200 rounded-lg">
                            <option>All Budgets</option>
                            <option>$50K - $100K</option>
                            <option>$100K - $250K</option>
                            <option>$250K+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Region</label>
                        <select className="w-full p-3 border border-gray-200 rounded-lg">
                            <option>Global</option>
                            <option>Africa</option>
                            <option>Asia</option>
                            <option>Americas</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Impact Type</label>
                        <select className="w-full p-3 border border-gray-200 rounded-lg">
                            <option>All Types</option>
                            <option>Environmental</option>
                            <option>Social</option>
                            <option>Economic</option>
                        </select>
                    </div>
                </div>
            </div>
        </aside>
    )
}



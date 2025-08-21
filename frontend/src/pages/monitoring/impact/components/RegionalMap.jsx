export default function RegionalMap() {
    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-blue-600 mr-3">🗺️</span>Regional Impact Distribution
            </h3>
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <img className="w-full h-full object-cover rounded-xl opacity-80" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a04bc9a3e2-e69d82c2e7e9a950fd83.png" alt="world map" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm">
                    <div className="bg-white/90 px-3 py-2 rounded-lg"><span className="text-green-500 mr-1">●</span>High Impact</div>
                    <div className="bg-white/90 px-3 py-2 rounded-lg"><span className="text-yellow-500 mr-1">●</span>Medium Impact</div>
                    <div className="bg-white/90 px-3 py-2 rounded-lg"><span className="text-blue-500 mr-1">●</span>Low Impact</div>
                </div>
            </div>
        </section>
    )
}



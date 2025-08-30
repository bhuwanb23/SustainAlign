// Lightweight responsive SVG line chart for Impact Trends
export default function ImpactTrends({ timeSeries, loading }) {
    // Default data if no time series data is available
    const defaultSeriesA = [400, 450, 520, 580, 620, 680]
    const defaultSeriesB = [200, 250, 300, 380, 420, 480]
    const defaultLabels = ['Jan','Feb','Mar','Apr','May','Jun']

    // Use real data if available, otherwise fall back to defaults
    const co2Data = timeSeries?.co2_reduced_tons || defaultSeriesA
    const treesData = timeSeries?.trees_planted || defaultSeriesB
    
    // Generate labels from actual data if available
    const labels = timeSeries?.co2_reduced_tons?.length ? 
        timeSeries.co2_reduced_tons.map((_, i) => `Month ${i + 1}`) : 
        defaultLabels

    function polyline(points, w, h, color) {
        if (!points || points.length === 0) return null
        
        const max = Math.max(...co2Data, ...treesData)
        const min = Math.min(...co2Data, ...treesData, 0)
        const span = max - min || 1
        const stepX = w / (points.length - 1)
        const path = points.map((y, i) => {
            const x = i * stepX
            const ny = h - ((y - min) / span) * h
            return `${x},${ny}`
        }).join(' ')
        return <polyline fill="none" stroke={color} strokeWidth="2" points={path} />
    }

    if (loading) {
        return (
            <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="text-green-600 mr-3">📈</span>Impact Trends
                </h3>
                <div className="relative h-80">
                    <div className="animate-pulse">
                        <div className="h-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-green-600 mr-3">📈</span>Impact Trends
            </h3>
            <div className="relative h-80">
                <svg viewBox="0 0 600 320" className="w-full h-full">
                    <rect x="0" y="0" width="600" height="320" fill="transparent" />
                    <g transform="translate(46,10)">
                        <rect x="0" y="0" width="540" height="263" fill="none" />
                        {polyline(co2Data, 540, 263, '#10b981')}
                        {polyline(treesData, 540, 263, '#059669')}
                        {co2Data.map((y,i)=>{
                            const max = Math.max(...co2Data, ...treesData)
                            const min = Math.min(...co2Data, ...treesData, 0)
                            const span = max - min || 1
                            const stepX = 540 / (co2Data.length - 1)
                            const x = i * stepX
                            const ny = 263 - ((y - min) / span) * 263
                            return <circle key={i} cx={x} cy={ny} r="4" fill="#10b981" />
                        })}
                    </g>
                </svg>
                <div className="absolute bottom-2 left-14 right-8 flex justify-between text-xs text-gray-600">
                    {labels.map(l=> <span key={l}>{l}</span>)}
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-4 text-xs">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>CO₂ Reduced</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                        <span>Trees Planted</span>
                    </div>
                </div>
            </div>
        </section>
    )
}



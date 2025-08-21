// Lightweight responsive SVG line chart for Impact Trends
const seriesA = [400, 450, 520, 580, 620, 680]
const seriesB = [200, 250, 300, 380, 420, 480]
const labels = ['Jan','Feb','Mar','Apr','May','Jun']

function polyline(points, w, h, color) {
    const max = Math.max(...seriesA, ...seriesB)
    const min = Math.min(...seriesA, ...seriesB, 0)
    const span = max - min || 1
    const stepX = w / (points.length - 1)
    const path = points.map((y, i) => {
        const x = i * stepX
        const ny = h - ((y - min) / span) * h
        return `${x},${ny}`
    }).join(' ')
    return <polyline fill="none" stroke={color} strokeWidth="2" points={path} />
}

export default function ImpactTrends() {
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
                        {polyline(seriesA, 540, 263, '#10b981')}
                        {polyline(seriesB, 540, 263, '#059669')}
                        {seriesA.map((y,i)=>{
                            const max = Math.max(...seriesA, ...seriesB)
                            const min = Math.min(...seriesA, ...seriesB, 0)
                            const span = max - min || 1
                            const stepX = 540 / (seriesA.length - 1)
                            const x = i * stepX
                            const ny = 263 - ((y - min) / span) * 263
                            return <circle key={i} cx={x} cy={ny} r="4" fill="#10b981" />
                        })}
                    </g>
                </svg>
                <div className="absolute bottom-2 left-14 right-8 flex justify-between text-xs text-gray-600">
                    {labels.map(l=> <span key={l}>{l}</span>)}
                </div>
            </div>
        </section>
    )
}



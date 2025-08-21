// Simple donut using SVG arcs
const data = [
    { name: 'Solar', value: 45, color: '#fbbf24' },
    { name: 'Wind', value: 35, color: '#06b6d4' },
    { name: 'Hydro', value: 20, color: '#3b82f6' }
]

function Arc({ start, end, radius, color }) {
    const cx = 120, cy = 120
    const r = radius
    const toRad = (d) => (Math.PI / 180) * d
    const sx = cx + r * Math.cos(toRad(start))
    const sy = cy + r * Math.sin(toRad(start))
    const ex = cx + r * Math.cos(toRad(end))
    const ey = cy + r * Math.sin(toRad(end))
    const large = end - start > 180 ? 1 : 0
    const d = `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`
    return <path d={d} stroke={color} strokeWidth="24" fill="none" />
}

export default function RenewableEnergy() {
    const total = data.reduce((s, d) => s + d.value, 0)
    let angle = -90
    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-yellow-500 mr-2">⚡</span>Renewable Energy
            </h3>
            <div className="h-64 grid place-items-center">
                <svg viewBox="0 0 240 240" className="w-60 h-60">
                    {data.map((slice, i) => {
                        const start = angle
                        const sweep = (slice.value / total) * 360
                        const end = start + sweep
                        angle = end
                        return <Arc key={slice.name} start={start} end={end} radius={80} color={slice.color} />
                    })}
                    <circle cx="120" cy="120" r="56" fill="white" />
                    <text x="120" y="120" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-700">Energy Mix</text>
                </svg>
            </div>
        </section>
    )
}



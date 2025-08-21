const days = ['Mon','Tue','Wed','Thu','Fri']
const values = [8,12,15,10,18]
const max = Math.max(...values)

export default function ImpactHeatmap() {
    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-orange-500 mr-2">🔥</span>Impact Heatmap
            </h3>
            <div className="h-48">
                <svg viewBox="0 0 600 192" className="w-full h-full">
                    <g transform="translate(40,16)">
                        {values.map((v,i)=>{
                            const w = 40
                            const gap = 40
                            const x = i * (w + gap)
                            const h = (v / max) * 150
                            const y = 160 - h
                            return <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#f59e0b" />
                        })}
                    </g>
                </svg>
                <div className="flex justify-around text-sm text-gray-600 -mt-3">
                    {days.map(d => <span key={d}>{d}</span>)}
                </div>
            </div>
        </section>
    )
}



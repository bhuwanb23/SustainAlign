const quarters = ['Q1','Q2','Q3','Q4']
const values = [120, 145, 160, 180]

export default function WasteReduction() {
    const max = Math.max(...values)
    return (
        <section className="glass rounded-2xl p-6 shadow-lg border border-green-100 bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-green-600 mr-2">♻️</span>Waste Reduction
            </h3>
            <div className="h-64">
                <svg viewBox="0 0 600 256" className="w-full h-full">
                    <g transform="translate(46,10)">
                        {values.map((v,i)=>{
                            const w = 40
                            const gap = 40
                            const x = i * (w + gap)
                            const h = (v / max) * 200 + 10
                            const y = 230 - h
                            return <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#10b981" />
                        })}
                    </g>
                </svg>
                <div className="flex justify-around text-sm text-gray-600 -mt-3">
                    {quarters.map(q => <span key={q}>{q}</span>)}
                </div>
            </div>
        </section>
    )
}



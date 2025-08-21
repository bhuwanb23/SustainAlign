function SpotlightCard({ gradient, tag, rating, title, desc, price, chips }) {
    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white card-hover cursor-pointer`}>
            <div className="flex items-center justify-between mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{tag}</span>
                <span className="text-2xl">⭐ {rating}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="opacity-90 mb-4">{desc}</p>
            <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{price}</span>
                <div className="flex space-x-1">
                    {chips.map((c)=> (
                        <span key={c} className="bg-white/20 px-2 py-1 rounded text-xs">{c}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function HeroSpotlight() {
    return (
        <section className="relative rounded-2xl overflow-hidden shadow-lg">
            {/* Solid gradient backdrop (removed white blur orbs for clarity) */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500" />

            <div className="relative p-6 md:p-10">
                <div className="relative text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Trending Impact Projects</h2>
                    <p className="text-white/90">Discover high-impact CSR opportunities making a difference worldwide</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <SpotlightCard gradient="from-green-500 to-emerald-600" tag="🌱 Climate Action" rating="4.9" title="Amazon Reforestation Initiative" desc="Plant 50,000 trees in deforested areas" price="$250,000" chips={["SDG 13","SDG 15"]} />
                    <SpotlightCard gradient="from-blue-500 to-cyan-600" tag="💧 Clean Water" rating="4.8" title="Rural Water Access Project" desc="Provide clean water to 10,000 people" price="$180,000" chips={["SDG 6","SDG 3"]} />
                    <SpotlightCard gradient="from-purple-500 to-pink-600" tag="📚 Education" rating="4.7" title="Digital Learning Centers" desc="Establish tech labs in rural schools" price="$320,000" chips={["SDG 4","SDG 9"]} />
                </div>
            </div>
        </section>
    )
}



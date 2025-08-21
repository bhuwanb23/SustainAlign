export default function HeroSection({ hero }) {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{hero.title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{hero.description}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {hero.tags.map((t) => (
              <span key={t.text} className={`${t.bg} ${t.textColor} px-3 py-1 rounded-full text-sm`}>{t.text}</span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-emerald-500">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg,#4ade80,#059669)' }}>
          <h3 className="text-lg font-semibold mb-4">Trust Score</h3>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.25)" strokeWidth="8" fill="none" />
              <circle cx="60" cy="60" r="50" stroke="white" strokeWidth="8" fill="none" strokeDasharray="314" strokeDashoffset={314 - (314 * hero.trust.score) / 100} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{hero.trust.score}</div>
                <div className="text-xs opacity-90">{hero.trust.label}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl mr-2">🌿</span>
            <span className="font-medium">{hero.trust.remark}</span>
          </div>
        </div>
      </div>
    </section>
  )
}



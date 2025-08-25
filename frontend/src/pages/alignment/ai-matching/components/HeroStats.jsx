export default function HeroStats({ stats }) {
  return (
    <header className="bg-emerald-700 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 px-6 py-12">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Top Matches for Your CSR Focus</h1>
          <p className="text-emerald-100">AI-powered recommendations aligned with your sustainability goals</p>
          <div className="mt-8 flex justify-center gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-emerald-100">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}



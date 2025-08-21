export default function TimelineOverview({ timeline }) {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline Overview</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg,#4CAF50,#2196F3)' }} />
          <div className="space-y-6">
            {timeline.map((t, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-4 h-4 rounded-full border-4 border-white shadow-lg relative z-10" style={{ backgroundColor: t.color }} />
                <div className="ml-6 text-sm text-gray-600">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



export default function InsightsSection({ suggestions, topProjects, forecast }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-900 font-semibold mb-3">Smart Suggestions</div>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          {suggestions.map((s, i) => (<li key={i}>{s}</li>))}
        </ul>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-900 font-semibold mb-3">Top 3 Projects to Consider</div>
        <ol className="list-decimal ml-5 text-gray-700 space-y-1">
          {topProjects.map((p, i) => (<li key={i}>{p}</li>))}
        </ol>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="text-gray-900 font-semibold mb-3">Impact Forecast</div>
        <div className="text-gray-700">Water saved: <span className="font-semibold">{forecast.water}</span></div>
        <div className="text-gray-700">Students reached: <span className="font-semibold">{forecast.students}</span></div>
        <div className="text-gray-700">CO₂ reduced: <span className="font-semibold">{forecast.co2}</span></div>
      </div>
    </div>
  )
}



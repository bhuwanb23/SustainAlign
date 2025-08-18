export default function RecommendationRationalePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Recommendation Rationale</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-4">
        <p className="text-gray-700">Why this project? This screen explains the AI rationale in corporate-friendly language.</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>High alignment with ESG/SDG priorities</li>
          <li>Strong NGO credibility and track record</li>
          <li>Projected impact per dollar is above benchmark</li>
        </ul>
      </div>
    </div>
  )
}



export default function ImpactSpotlight({ story }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow p-6 border mb-6">
      <div className="flex items-center gap-4">
        <img src={story.image} alt="spotlight" className="w-28 h-28 object-cover rounded-xl shadow" />
        <div>
          <div className="text-sm text-gray-600">Impact Spotlight</div>
          <div className="text-xl font-extrabold text-gray-900 tracking-tight">{story.title}</div>
          <div className="text-sm text-gray-700 mt-1">{story.subtitle}</div>
        </div>
      </div>
    </div>
  )
}



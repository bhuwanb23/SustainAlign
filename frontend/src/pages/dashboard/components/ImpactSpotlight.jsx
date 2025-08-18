export default function ImpactSpotlight({ story }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border mb-6">
      <div className="flex items-center gap-4">
        <img src={story.image} alt="spotlight" className="w-28 h-28 object-cover rounded-xl" />
        <div>
          <div className="text-sm text-gray-600">Impact Spotlight</div>
          <div className="text-lg font-semibold text-gray-900">{story.title}</div>
          <div className="text-sm text-gray-700 mt-1">{story.subtitle}</div>
        </div>
      </div>
    </div>
  )
}



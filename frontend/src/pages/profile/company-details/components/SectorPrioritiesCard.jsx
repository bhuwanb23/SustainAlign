export default function SectorPrioritiesCard({
  climatePercent,
  setClimatePercent,
  educationPercent,
  setEducationPercent,
  healthcarePercent,
  setHealthcarePercent,
}) {
  return (
    <div id="sector-priorities-card" className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
          <svg className="h-6 w-6 text-teal-600" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden>
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448a200 200 0 1 1 0-400 200 200 0 0 1 0 400z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sector Priorities</h2>
          <p className="text-gray-600">Allocate budget across impact areas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-bold text-gray-800">Climate &amp; Environment</h3>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget %</label>
            <input
              type="range"
              min="0"
              max="100"
              value={climatePercent}
              onChange={(e) => setClimatePercent(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>0%</span>
              <span id="climate-percent">{climatePercent}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-bold text-gray-800">Education</h3>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget %</label>
            <input
              type="range"
              min="0"
              max="100"
              value={educationPercent}
              onChange={(e) => setEducationPercent(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>0%</span>
              <span id="education-percent">{educationPercent}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="font-bold text-gray-800">Healthcare</h3>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget %</label>
            <input
              type="range"
              min="0"
              max="100"
              value={healthcarePercent}
              onChange={(e) => setHealthcarePercent(Number(e.target.value))}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>0%</span>
              <span id="healthcare-percent">{healthcarePercent}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



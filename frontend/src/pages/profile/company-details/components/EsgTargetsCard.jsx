export default function EsgTargetsCard({ targetYear, setTargetYear, reportingStandard, setReportingStandard }) {
  return (
    <div id="esg-targets-card" className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
          <svg className="h-6 w-6 text-purple-600" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden>
            <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">ESG Targets</h2>
          <p className="text-gray-600">Set your environmental, social, and governance goals</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Carbon Neutrality Target Year</label>
          <select
            value={targetYear}
            onChange={(e) => setTargetYear(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select target year</option>
            <option>2025</option>
            <option>2030</option>
            <option>2035</option>
            <option>2040</option>
            <option>2050</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Sustainability Reporting Standard</label>
          <select
            value={reportingStandard}
            onChange={(e) => setReportingStandard(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select standard</option>
            <option>GRI Standards</option>
            <option>SASB</option>
            <option>TCFD</option>
            <option>UN Global Compact</option>
          </select>
        </div>
      </div>
    </div>
  )
}



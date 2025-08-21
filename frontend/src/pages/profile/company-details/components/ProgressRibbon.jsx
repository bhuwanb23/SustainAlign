export default function ProgressRibbon() {
  return (
    <div id="progress-ribbon" className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Corporate CSR Profile Setup</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">1</div>
              <div className="w-12 h-1 bg-green-500 mx-2"></div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">2</div>
              <div className="w-12 h-1 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">3</div>
            </div>
            <span className="text-sm text-gray-600">Step 2 of 3: Company Details</span>
          </div>
        </div>
      </div>
    </div>
  )
}



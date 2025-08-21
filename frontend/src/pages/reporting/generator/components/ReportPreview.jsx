export default function ReportPreview({ isGenerating, lastUpdated }) {
  return (
    <section className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Report Preview</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>⏱️</span>
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
      <div className="p-6 h-[600px] overflow-y-auto">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">⏳</div>
              <p className="text-gray-600">Generating report...</p>
            </div>
          </div>
        ) : (
          <div className="print-animation">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ESG Progress Report</h1>
                  <p className="text-gray-600 mt-1">Q4 2024 Performance Summary</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Generated on</div>
                  <div className="font-medium">January 15, 2025</div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Executive Summary</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700">Our organization achieved significant progress in environmental sustainability, reducing carbon emissions by 23% while maintaining operational excellence. Key achievements include renewable energy adoption and waste reduction initiatives.</p>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Key Performance Indicators</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">23%</div>
                  <div className="text-sm text-gray-600">Carbon Reduction</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-gray-600">Energy Efficiency</div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">SDG Alignment</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Goal 7: Clean Energy</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }} /></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Goal 13: Climate Action</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} /></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}



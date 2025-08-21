export default function AllocationPreview({
  totalBudget,
  climatePercent,
  educationPercent,
  healthcarePercent,
  climateAmount,
  educationAmount,
  healthcareAmount,
}) {
  const fmt = (n) => `$${Number(n || 0).toLocaleString()}`
  return (
    <div id="allocation-preview" className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 sticky top-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="h-7 w-7 text-green-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden>
            <path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">CSR Allocation Preview</h3>
        <p className="text-gray-600">Real-time budget distribution</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Total Budget</span>
            <span className="font-bold text-2xl text-green-600" id="total-display">{fmt(totalBudget)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg mr-2">🌱</span>
              <span className="font-medium text-gray-700">Climate</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600" id="climate-amount">{fmt(climateAmount)}</div>
              <div className="text-sm text-gray-500" id="climate-display">{climatePercent}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg mr-2">📚</span>
              <span className="font-medium text-gray-700">Education</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-blue-600" id="education-amount">{fmt(educationAmount)}</div>
              <div className="text-sm text-gray-500" id="education-display">{educationPercent}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg mr-2">❤️</span>
              <span className="font-medium text-gray-700">Healthcare</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-red-600" id="healthcare-amount">{fmt(healthcareAmount)}</div>
              <div className="text-sm text-gray-500" id="healthcare-display">{healthcarePercent}%</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
          <div className="text-center">
            <svg className="h-6 w-6 text-green-600 mx-auto mb-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden>
              <path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216c-16.6 0-32.7 1.9-48.2 5.4c-25.9 5.9-50 16.4-71.4 30.7C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z" />
            </svg>
            <p className="text-sm text-green-700 font-medium">Every allocation plants seeds of positive change</p>
          </div>
        </div>
      </div>
    </div>
  )
}



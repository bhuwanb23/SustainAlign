export default function ReportGeneratorPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Report Generator</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <p className="text-gray-700">Generate CSR/ESG reports. Download as PDF, Excel, or PPT.</p>
        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 rounded-xl bg-gray-100">JSON</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">PPT</button>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white">PDF</button>
          <button className="px-4 py-2 rounded-xl bg-yellow-600 text-white">Excel</button>
        </div>
      </div>
    </div>
  )
}



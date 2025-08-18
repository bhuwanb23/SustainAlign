export default function IntegrationSetupPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Integration Setup</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['SAP', 'Workday', 'Microsoft Sustainability Cloud'].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="text-gray-900 font-semibold">{i}</div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white">Connect</button>
          </div>
        ))}
      </div>
    </div>
  )
}



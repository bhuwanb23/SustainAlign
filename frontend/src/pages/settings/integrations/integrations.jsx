export default function IntegrationSetupPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-2">Integration Setup</h1>
      <p className="text-sm text-gray-600 mb-6">Enable enterprise integrations. OAuth connections are stored securely and can be revoked anytime.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{name:'SAP', icon:'🧩', desc:'Finance & vendor data'}, {name:'Workday', icon:'👥', desc:'People & org data'}, {name:'MSC', icon:'☁️', desc:'Sustainability data'}].map((i) => (
          <div key={i.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg">{i.icon}</div>
              <div>
                <div className="text-gray-900 font-semibold">{i.name}</div>
                <div className="text-sm text-gray-600">{i.desc}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Connect</button>
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">Docs</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



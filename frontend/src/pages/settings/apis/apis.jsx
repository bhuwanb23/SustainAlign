export default function ApiManagementPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-2">API Management</h1>
      <p className="text-sm text-gray-600 mb-6">Manage external data sources and credentials. Keys are encrypted at rest.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{
          name: 'NGO Darpan', desc: 'Gov. registry for Indian NGOs', status: 'Not configured', icon: '🏛️'
        },{
          name: 'UN SDG', desc: 'Taxonomy & targets reference', status: 'Not configured', icon: '🌍'
        },{
          name: 'OpenCorporates', desc: 'Company registry lookups', status: 'Optional', icon: '🏢'
        },{
          name: 'Maps & Geocoding', desc: 'Location enrichment', status: 'Optional', icon: '🗺️'
        }].map((api) => (
          <div key={api.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg">{api.icon}</div>
                <div>
                  <div className="text-gray-900 font-semibold">{api.name} API</div>
                  <div className="text-sm text-gray-600">{api.desc}</div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{api.status}</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input placeholder="Paste API key" className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-300" />
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



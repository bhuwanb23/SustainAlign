export default function ApiManagementPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">API Management</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-900 font-medium">NGO Darpan API</div>
            <div className="text-sm text-gray-600">Status: Not configured</div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Add Key</button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-900 font-medium">UN SDG API</div>
            <div className="text-sm text-gray-600">Status: Not configured</div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Add Key</button>
        </div>
      </div>
    </div>
  )
}



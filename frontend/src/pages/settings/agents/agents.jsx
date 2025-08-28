export default function AgentControlsPage() {
  const agents = [
    { name: 'Discovery', enabled: true },
    { name: 'Alignment', enabled: true },
    { name: 'Reporting', enabled: false },
  ]
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-2">Agent Controls</h1>
      <p className="text-sm text-gray-600 mb-6">Toggle AI agents that power different flows. Changes apply instantly.</p>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-3">
        {agents.map((a) => (
          <label key={a.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-900">{a.name}</span>
            <input type="checkbox" className="accent-emerald-600" defaultChecked={a.enabled} />
          </label>
        ))}
        <div className="pt-3 flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">Reset</button>
          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Save Changes</button>
        </div>
      </div>
    </div>
  )
}



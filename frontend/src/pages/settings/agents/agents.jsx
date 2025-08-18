export default function AgentControlsPage() {
  const agents = [
    { name: 'Discovery', enabled: true },
    { name: 'Alignment', enabled: true },
    { name: 'Reporting', enabled: false },
  ]
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Agent Controls</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-3">
        {agents.map((a) => (
          <label key={a.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-900">{a.name}</span>
            <input type="checkbox" className="accent-emerald-600" defaultChecked={a.enabled} />
          </label>
        ))}
      </div>
    </div>
  )
}



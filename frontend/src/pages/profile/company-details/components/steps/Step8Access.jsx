export default function Step8Access({ roles, setRoles, integrations, setIntegrations }) {
  const addUser = () => setRoles([...roles, { email: '', role: 'CSR Manager' }])
  const updateUser = (i, key, val) => setRoles(roles.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)))
  const removeUser = (i) => setRoles(roles.filter((_, idx) => idx !== i))

  const INTEGRATIONS = ['SAP', 'Workday', 'Microsoft Sustainability Cloud']
  const toggleIntegration = (x) => setIntegrations(integrations.includes(x) ? integrations.filter((i) => i !== x) : [...integrations, x])

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Account Security & Access</h3>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-800">Role Assignment</label>
          <button type="button" className="text-emerald-700 text-sm" onClick={addUser}>+ Invite Member</button>
        </div>
        <div className="space-y-3">
          {roles.map((r, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <input placeholder="Email" className="rounded-lg border border-gray-300 px-3 py-2" value={r.email} onChange={(e) => updateUser(i, 'email', e.target.value)} />
              <select className="rounded-lg border border-gray-300 px-3 py-2" value={r.role} onChange={(e) => updateUser(i, 'role', e.target.value)}>
                <option>Admin</option>
                <option>CSR Manager</option>
                <option>Finance Officer</option>
              </select>
              <button type="button" className="text-sm text-red-600" onClick={() => removeUser(i)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">API Integration Preferences</label>
        <div className="flex items-center gap-3 flex-wrap">
          {INTEGRATIONS.map((x) => (
            <label key={x} className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${integrations.includes(x) ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-gray-300 text-gray-700'}`}>
              <input type="checkbox" className="hidden" checked={integrations.includes(x)} onChange={() => toggleIntegration(x)} />
              {x}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}



export default function UserManagementPage() {
  const users = [
    { name: 'Sarah Green', role: 'Admin' },
    { name: 'Amit Patel', role: 'Analyst' },
  ]
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-2">User Management</h1>
      <p className="text-sm text-gray-600 mb-6">Invite teammates, assign roles, and revoke access.</p>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <input placeholder="user@email.com" className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-300" />
          <select className="px-3 py-2 text-sm rounded-lg border border-gray-200">
            <option>Admin</option>
            <option>Analyst</option>
            <option>Viewer</option>
          </select>
          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Invite</button>
        </div>
        {users.map((u) => (
          <div key={u.name} className="flex items-center justify-between p-3 border-b last:border-0">
            <span className="text-gray-900">{u.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{u.role}</span>
              <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



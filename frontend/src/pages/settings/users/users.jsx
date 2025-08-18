export default function UserManagementPage() {
  const users = [
    { name: 'Sarah Green', role: 'Admin' },
    { name: 'Amit Patel', role: 'Analyst' },
  ]
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">User Management</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        {users.map((u) => (
          <div key={u.name} className="flex items-center justify-between p-3 border-b last:border-0">
            <span className="text-gray-900">{u.name}</span>
            <span className="text-gray-600">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}



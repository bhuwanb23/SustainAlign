export default function AuditTrailPage() {
  const logs = [
    { ts: '2025-01-02 10:10', msg: 'AI recommended Clean Water Initiative' },
    { ts: '2025-01-05 14:20', msg: 'Compliance review added notes' },
    { ts: '2025-01-07 09:00', msg: 'Project approved by Board' },
  ]
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Audit Trail</h1>
      <div className="space-y-3">
        {logs.map((l, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <div className="text-sm text-gray-500">{l.ts}</div>
            <div className="text-gray-800">{l.msg}</div>
          </div>
        ))}
      </div>
    </div>
  )
}



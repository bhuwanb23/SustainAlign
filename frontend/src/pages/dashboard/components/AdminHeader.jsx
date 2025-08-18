export default function AdminHeader({ adminName, dateString, kpis }) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Welcome, {adminName}</h1>
          <div className="text-sm text-gray-600">{dateString}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border shadow p-4">
            <div className="text-sm text-gray-600">{k.label}</div>
            <div className="text-xl font-extrabold text-gray-900 mt-1">{k.value}</div>
            {k.badge && (<div className={`mt-2 inline-flex text-xs px-2 py-0.5 rounded-md ${k.badgeClass || 'bg-gray-100 text-gray-700'}`}>{k.badge}</div>)}
          </div>
        ))}
      </div>
    </div>
  )
}



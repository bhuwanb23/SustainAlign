export default function DashboardTopBar({ company }) {
  return (
    <div className="px-8 pt-6 pb-2">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">🌿</div>
          <div>
            <div className="text-sm text-gray-600">{company.tagline || 'Corporate Social Responsibility'}</div>
            <div className="font-extrabold text-xl text-gray-900">{company.name} · FY {company.fy}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-xl ml-auto">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5">🔎</span>
            <input className="w-full border rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="Search projects, reports, NGOs…" />
          </div>
          <button className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50">🔔</button>
          <a href="/settings/users" className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50">⚙️</a>
          <button className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50">❓</button>
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-9 h-9 rounded-full border" />
        </div>
      </div>
    </div>
  )
}



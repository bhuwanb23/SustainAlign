export default function DashboardTopBar({ company }) {
  return (
    <div className="px-8 pt-6 pb-2">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-sm">🌿</div>
          <div>
            <div className="inline-flex items-center gap-2">
              <div className="font-extrabold text-xl text-gray-900 tracking-tight">{company.name}</div>
              <span className="px-2 py-0.5 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-100">FY {company.fy}</span>
            </div>
            <div className="text-sm text-gray-600">{company.tagline || 'Driving sustainable outcomes'}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-2xl ml-auto">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5">🔎</span>
            <input className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 bg-white/90" placeholder="Search projects, reports, NGOs…" />
          </div>
          <button title="Notifications" className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 shadow-sm">🔔</button>
          <a title="Settings" href="/settings/users" className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 shadow-sm">⚙️</a>
          <button title="Help" className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 shadow-sm">❓</button>
          <img alt="profile" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-9 h-9 rounded-full ring-2 ring-emerald-100" />
        </div>
      </div>
    </div>
  )
}



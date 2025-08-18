import { NavLink } from 'react-router-dom'

const linkBase = "px-3 py-2 rounded-lg text-sm font-medium"

export default function TopNav() {
  const linkClass = ({ isActive }) =>
    isActive
      ? `${linkBase} bg-emerald-600 text-white`
      : `${linkBase} text-gray-700 hover:bg-gray-100`

  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <NavLink to="/dashboard" className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">
          SustainAlign
        </NavLink>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/discovery/search" className={linkClass}>Discover</NavLink>
          <NavLink to="/alignment/matching" className={linkClass}>Alignment</NavLink>
          <NavLink to="/monitoring/impact" className={linkClass}>Monitoring</NavLink>
          <NavLink to="/reporting/generator" className={linkClass}>Reports</NavLink>
          <NavLink to="/settings/users" className={linkClass}>Settings</NavLink>
        </nav>
      </div>
    </header>
  )
}



import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-screen font-sans bg-[radial-gradient(60rem_30rem_at_-10%_-10%,rgba(16,185,129,0.06),transparent_60%),radial-gradient(60rem_30rem_at_110%_110%,rgba(16,185,129,0.06),transparent_60%)]">
      <TopNav />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}



import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'

export default function AppLayout() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-sans min-h-screen">
      <TopNav />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}



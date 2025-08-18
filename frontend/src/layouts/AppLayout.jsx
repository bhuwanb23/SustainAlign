import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/dashboard/components/Sidebar.jsx'

export default function AppLayout() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-sans min-h-screen">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}



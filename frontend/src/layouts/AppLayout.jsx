import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <AnimatedBackground />
      <TopNav />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}



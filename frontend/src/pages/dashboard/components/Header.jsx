export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">CSR Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back. Here's your sustainability overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="text-gray-500 text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </div>
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-emerald-100" />
        </div>
      </div>
    </header>
  )
}



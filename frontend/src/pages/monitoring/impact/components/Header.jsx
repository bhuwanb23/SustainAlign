export default function Header() {
    return (
        <header className="sticky top-0 z-30 border-b border-green-100/70 bg-white/80 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white">🍃</div>
                        <h1 className="text-2xl font-bold text-gray-800">Impact Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-3 md:px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">Export Report</button>
                        <img className="w-10 h-10 rounded-full border-2 border-green-200" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="avatar" />
                    </div>
                </div>
            </div>
        </header>
    )
}



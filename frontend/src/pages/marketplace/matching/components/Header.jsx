export default function Header() {
    return (
        <header className="rounded-2xl overflow-hidden shadow-lg">
            <div className="gradient-bg text-white">
                <div className="px-6 md:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">🤝</span>
                            <h1 className="text-2xl font-bold">ImpactMatch</h1>
                        </div>
                        <nav className="flex items-center space-x-6">
                            <span className="hover:text-green-200 transition-colors cursor-pointer">Dashboard</span>
                            <span className="hover:text-green-200 transition-colors cursor-pointer">Projects</span>
                            <span className="hover:text-green-200 transition-colors cursor-pointer">Analytics</span>
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Profile" className="w-8 h-8 rounded-full"/>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}



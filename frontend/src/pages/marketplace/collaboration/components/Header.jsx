export default function Header() {
    return (
        <header className="rounded-2xl overflow-hidden shadow-lg">
            <div className="gradient-bg text-white">
                <div className="px-6 md:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">🌐</span>
                            <h1 className="text-2xl font-bold">CSR Impact Hub</h1>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <span className="hover:text-green-200 transition-colors cursor-pointer">Projects</span>
                            <span className="hover:text-green-200 transition-colors cursor-pointer">NGOs</span>
                            <span className="hover:text-green-200 transition-colors cursor-pointer">Impact</span>
                            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors">Post Project</button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}



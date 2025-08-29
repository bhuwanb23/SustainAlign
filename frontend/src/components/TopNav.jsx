import { NavLink } from 'react-router-dom'
import { getToken, isAuthenticated, parseJwt } from '../lib/auth'
import { useState, useRef, useEffect } from 'react'

const linkBase = "px-4 py-2 rounded-full text-[13px] leading-none font-medium tracking-tight transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60"

export default function TopNav() {
    const linkClass = ({ isActive }) =>
        isActive
            ? `${linkBase} bg-green-600 text-white shadow-md ring-1 ring-green-300/40`
            : `${linkBase} text-green-800/95 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-800 hover:ring-1 hover:ring-green-200/80 hover:shadow-sm`

    // Derive role from JWT if available
    let role = 'guest'
    const authed = isAuthenticated()
    if (authed) {
        const payload = parseJwt(getToken()) || {}
        role = payload.role || 'corporate'
    }

    // State for managing dropdown visibility with delays
    const [activeDropdown, setActiveDropdown] = useState(null)
    const dropdownTimeoutRef = useRef(null)

    // Function to show dropdown
    const showDropdown = (dropdownName) => {
        setActiveDropdown(dropdownName)
        // Clear any existing timeout
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current)
        }
    }

    // Function to hide dropdown with delay
    const hideDropdown = (dropdownName) => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null)
        }, 3000) // 3 second delay
    }

    // Function to cancel hiding dropdown
    const cancelHideDropdown = () => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current)
        }
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current)
            }
        }
    }, [])

    return (
        <header className="bg-green-600/95 backdrop-blur supports-[backdrop-filter]:bg-green-600/80 text-white border-b border-green-700 sticky top-0 z-[9999]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 min-w-0">
                <NavLink to="/dashboard" className="shrink-0 inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-white hover:text-green-100">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-sm ring-1 ring-white/40">🌿</span>
                    <span>SustainAlign</span>
                </NavLink>
                <nav className="hidden md:flex items-center flex-nowrap flex-1 min-w-0 justify-end overflow-visible">
                    <div className="flex items-center gap-2 bg-green-700/40 border border-white/20 rounded-full px-2 py-2 shadow-md ring-1 ring-white/20">

                        {/* 🏠 Dashboard (admin only) */}
                        {role === 'admin' && (
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('admin')}
                            onMouseLeave={() => hideDropdown('admin')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>🏠 Dashboard <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-64 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'admin' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('admin')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">Admin Dashboard</div>
                                <div className="flex flex-col gap-1">
                                    <NavLink to="/dashboard" className={linkClass}>Dashboard Main</NavLink>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* 🏗️ Corporate Profile Setup */}
                        {(role === 'corporate' || role === 'ngo') && (
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('corporate')}
                            onMouseLeave={() => hideDropdown('corporate')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>🏗️ Corporate Setup <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-72 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'corporate' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('corporate')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">Corporate Profile</div>
                                <div className="flex flex-col gap-1">
                                    {/* Company details form removed - only showcase remains */}
                                    <NavLink to="/profile/company-showcase" className={linkClass}>Company Details Showcase</NavLink>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* 🔎 Project Discovery (no add for corporate) */}
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('discovery')}
                            onMouseLeave={() => hideDropdown('discovery')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>🔎 Discovery <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-72 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'discovery' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('discovery')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">Project Discovery Page (Agent 1)</div>
                                <div className="flex flex-col gap-1">
                                    {role !== 'corporate' && <NavLink to="/discovery/add" className={linkClass}>Add New Project</NavLink>}
                                    <NavLink to="/discovery/cards" className={linkClass}>View All Projects</NavLink>
                                </div>
                            </div>
                        </div>

                        {/* 🎯 Alignment & Evaluation (corporate only) */}
                        {role === 'corporate' && (
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('alignment')}
                            onMouseLeave={() => hideDropdown('alignment')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>🎯 Alignment <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-80 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'alignment' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('alignment')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">Alignment & Evaluation Page (Agents 2 & 3)</div>
                                <div className="flex flex-col gap-1">
                                    <NavLink to="/alignment/matching" className={linkClass}>AI Matching Results File</NavLink>
                                    <NavLink to="/alignment/comparison" className={linkClass}>Comparison Matrix File</NavLink>
                                    <NavLink to="/alignment/risk" className={linkClass}>Risk Scoring File</NavLink>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* 🧑‍⚖️ Decision Support (corporate only) */}
                        {role === 'corporate' && (
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('decision')}
                            onMouseLeave={() => hideDropdown('decision')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>🧑‍⚖️ Decision <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-80 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'decision' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('decision')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">Decision Support Page (Agent 4)</div>
                                <div className="flex flex-col gap-1">
                                    <NavLink to="/decision/rationale" className={linkClass}>Recommendation Rationale File</NavLink>
                                    <NavLink to="/decision/approval" className={linkClass}>Approval Workflow File</NavLink>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* 📊 Monitor & Report (corporate + NGO + admin) */}
                        {(role === 'corporate' || role === 'ngo' || role === 'admin') && (
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('monitoring')}
                            onMouseLeave={() => hideDropdown('monitoring')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>📊 Monitor & Report <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-80 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'monitoring' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('monitoring')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">Monitoring & Reporting</div>
                                <div className="flex flex-col gap-1">
                                    <NavLink to="/monitoring/tracker" className={linkClass}>Project Tracker</NavLink>
                                    <NavLink to="/monitoring/impact" className={linkClass}>Impact Dashboard</NavLink>
                                    <NavLink to="/monitoring/alerts" className={linkClass}>Alerts</NavLink>
                                    <div className="border-t border-green-200 my-1"></div>
                                    <NavLink to="/reporting/generator" className={linkClass}>Report Generator</NavLink>
                                    <NavLink to="/reporting/audit-trail" className={linkClass}>Audit Trail</NavLink>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* 📂 Marketplace (NGO + corporate) */}
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('marketplace')}
                            onMouseLeave={() => hideDropdown('marketplace')}
                        >
                            <button className={`${linkBase} bg-transparent text-white flex items-center gap-1 hover:bg-white/10`}>📂 Marketplace <span className="text-green-100 transition-transform duration-200 group-hover:translate-y-[1px]">▾</span></button>
                            <div 
                                className={`absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'marketplace' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('marketplace')}
                            >
                                <div className="text-xs font-semibold text-green-600 mb-2">CSR/ESG Marketplace (Future)</div>
                                <div className="flex flex-col gap-1">
                                    <NavLink to="/marketplace/ngo" className={linkClass}>NGO Profiles</NavLink>
                                    <NavLink to="/marketplace/matching" className={linkClass}>Bidding/Matching</NavLink>
                                </div>
                            </div>
                        </div>

                        {/* 👤 Profile / Auth */}
                        <div 
                            className="relative group"
                            onMouseEnter={() => showDropdown('profile')}
                            onMouseLeave={() => hideDropdown('profile')}
                        >
                            <button className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-blue-600 text-white hover:opacity-95 shadow-md ring-1 ring-green-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60">
                                <span className="sr-only">Profile</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M12 2.25a4.5 4.5 0 0 0-2.508 8.244A8.252 8.252 0 0 0 3.75 18a.75.75 0 0 0 1.5 0 6.75 6.75 0 1 1 13.5 0 .75.75 0 0 0 1.5 0 8.252 8.252 0 0 0-5.742-7.506A4.5 4.5 0 0 0 12 2.25Zm0 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div 
                                className={`absolute right-0 mt-2 w-56 z-50 bg-white/95 backdrop-blur-xl border border-green-200/70 rounded-2xl shadow-2xl ring-1 ring-green-300/40 p-4 transition-all duration-300 ${
                                    activeDropdown === 'profile' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                                }`}
                                onMouseEnter={cancelHideDropdown}
                                onMouseLeave={() => hideDropdown('profile')}
                            >
                                {!authed ? (
                                    <div className="flex flex-col gap-1">
                                        <NavLink to="/login" className={linkClass}>Login</NavLink>
                                        <NavLink to="/signup" className={linkClass}>Signup</NavLink>
                                        <NavLink to="/auth/forgot" className={linkClass}>Forgot Password</NavLink>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-xs font-semibold text-green-700 mb-2">Account</div>
                                        <div className="flex flex-col gap-1">
                                            {role === 'corporate' && <NavLink to="/settings/users" className={linkClass}>User Management</NavLink>}
                                            {role === 'corporate' && <NavLink to="/settings/agents" className={linkClass}>Agent Controls</NavLink>}
                                            {role === 'corporate' && <NavLink to="/settings/integrations" className={linkClass}>Integrations</NavLink>}
                                            {role === 'corporate' && <NavLink to="/settings/apis" className={linkClass}>API Management</NavLink>}
                                            <div className="border-t border-green-200 my-1"></div>
                                            <NavLink to="/support/faq" className={linkClass}>Help / FAQ</NavLink>
                                            <NavLink to="/support/chat" className={linkClass}>Chat Support</NavLink>
                                            <NavLink to="/support/feedback" className={linkClass}>Feedback</NavLink>
                                            <div className="border-t border-green-200 my-1"></div>
                                            <NavLink to="/logout" className={linkClass}>Log out</NavLink>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}



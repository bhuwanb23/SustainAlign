import { NavLink } from 'react-router-dom'

const linkBase = "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"

export default function TopNav() {
  const linkClass = ({ isActive }) =>
    isActive
      ? `${linkBase} bg-emerald-600 text-white`
      : `${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700`

  return (
    <header className="bg-white/80 backdrop-blur border-b border-emerald-100 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <NavLink to="/dashboard" className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text hover:opacity-90">
          SustainAlign
        </NavLink>
        <nav className="hidden md:flex items-center gap-2">
          {/* 🔐 Authentication & Access */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>🔐 Auth <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Authentication & Access</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/login" className={linkClass}>Login Page</NavLink>
                <NavLink to="/signup" className={linkClass}>Signup Page</NavLink>
                <NavLink to="/forgot-password" className={linkClass}>Forgot Password Page</NavLink>
                <NavLink to="/profile-setup" className={linkClass}>Profile Setup Page</NavLink>
              </div>
            </div>
          </div>

          {/* 🏠 Corporate Dashboard */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>🏠 Dashboard <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Corporate Dashboard</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/dashboard" className={linkClass}>Dashboard Main File</NavLink>
              </div>
            </div>
          </div>

          {/* 🏗️ Corporate Profile Setup */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>🏗️ Corporate Setup <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Corporate Profile Setup</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/profile/company-details" className={linkClass}>Company Details File</NavLink>
                <NavLink to="/profile/csr-history" className={linkClass}>CSR History Upload File</NavLink>
                <NavLink to="/profile/sdg-selector" className={linkClass}>ESG/SDG Selector File</NavLink>
              </div>
            </div>
          </div>

          {/* 🔎 Project Discovery */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>🔎 Discovery <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Project Discovery Page (Agent 1)</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/discovery/search" className={linkClass}>Project Search File</NavLink>
                <NavLink to="/discovery/cards" className={linkClass}>Project Cards File</NavLink>
              </div>
            </div>
          </div>

          {/* 🎯 Alignment & Evaluation */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>🎯 Alignment <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Alignment & Evaluation Page (Agents 2 & 3)</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/alignment/matching" className={linkClass}>AI Matching Results File</NavLink>
                <NavLink to="/alignment/comparison" className={linkClass}>Comparison Matrix File</NavLink>
                <NavLink to="/alignment/risk" className={linkClass}>Risk Scoring File</NavLink>
              </div>
            </div>
          </div>

          {/* 🧑‍⚖️ Decision Support */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>🧑‍⚖️ Decision <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Decision Support Page (Agent 4)</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/decision/rationale" className={linkClass}>Recommendation Rationale File</NavLink>
                <NavLink to="/decision/approval" className={linkClass}>Approval Workflow File</NavLink>
              </div>
            </div>
          </div>

          {/* 📊 Monitoring & Tracking */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>📊 Monitoring <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Monitoring & Tracking Page (Agent 5)</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/monitoring/tracker" className={linkClass}>Project Tracker File</NavLink>
                <NavLink to="/monitoring/impact" className={linkClass}>Impact Dashboard File</NavLink>
                <NavLink to="/monitoring/alerts" className={linkClass}>Alerts File</NavLink>
              </div>
            </div>
          </div>

          {/* 📑 Reporting & Compliance */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>📑 Reporting <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Reporting & Compliance Page (Agent 6)</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/reporting/generator" className={linkClass}>Report Generator File</NavLink>
                <NavLink to="/reporting/audit-trail" className={linkClass}>Audit Trail File</NavLink>
              </div>
            </div>
          </div>

          {/* 📂 Marketplace */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>📂 Marketplace <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">CSR/ESG Marketplace (Future)</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/marketplace/projects" className={linkClass}>CSR Projects Marketplace File</NavLink>
                <NavLink to="/marketplace/ngo" className={linkClass}>NGO Profiles File</NavLink>
                <NavLink to="/marketplace/matching" className={linkClass}>Bidding/Matching File</NavLink>
              </div>
            </div>
          </div>

          {/* ⚙️ Settings & Admin */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>⚙️ Settings <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Settings & Admin Panel</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/settings/users" className={linkClass}>User Management File</NavLink>
                <NavLink to="/settings/system" className={linkClass}>System Settings File</NavLink>
                <NavLink to="/settings/data" className={linkClass}>Data Management File</NavLink>
              </div>
            </div>
          </div>

          {/* ❓ Help & Support */}
          <div className="relative group">
            <button className={`${linkBase} text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1`}>❓ Support <span className="text-emerald-400">▾</span></button>
            <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-100 ring-1 ring-emerald-100/50 p-4 hidden group-hover:block">
              <div className="text-xs font-semibold text-emerald-600 mb-2">Help & Support</div>
              <div className="flex flex-col gap-1">
                <NavLink to="/support/knowledge-base" className={linkClass}>Knowledge Base File</NavLink>
                <NavLink to="/support/chat" className={linkClass}>Chat Support File</NavLink>
                <NavLink to="/support/faq" className={linkClass}>FAQ File</NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}



import { Link } from 'react-router-dom'

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Profile Setup</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition-shadow" to="/profile/company-details">Company Details</Link>
        <Link className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition-shadow" to="/profile/csr-history">CSR History Upload</Link>
        <Link className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition-shadow" to="/profile/sdg-selector">ESG/SDG Selector</Link>
      </div>
    </div>
  )
}

import AuthLayout from './AuthLayout.jsx'

export default function ProfileSetupPage() {
  return (
    <AuthLayout
      title="Complete your profile"
      subtitle="Set your role and preferences to personalize your dashboard"
      footer={<span>All set? <a className="text-emerald-700 hover:underline" href="/dashboard">Go to dashboard →</a></span>}
    >
      <h2 className="text-xl font-bold text-gray-900">Profile details</h2>
      <p className="text-gray-600 text-sm mb-6">Tell us a bit about your organization and focus areas.</p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">👥</span>
            <select className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" defaultValue="corporate">
              <option value="corporate">Corporate</option>
              <option value="ngo">NGO</option>
              <option value="regulator">Regulator</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization / Company</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">🏢</span>
            <input className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="Acme Corp" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">📍</span>
            <input className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="City, Country" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Interests / Focus areas</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">✨</span>
            <input className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="Education, Environment, Health" />
          </div>
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-2 shadow-sm">Save and continue</button>
        </div>
      </form>
    </AuthLayout>
  )
}



import AuthLayout from './AuthLayout.jsx'
import { Link } from 'react-router-dom'

export default function ProfileSetupPage() {
  return (
    <AuthLayout
      title="Complete your profile"
      subtitle="Set your role and preferences to personalize your dashboard"
      footer={<span>All set? <a className="text-emerald-700 hover:underline" href="/dashboard">Go to dashboard →</a></span>}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Setup</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition-shadow" to="/profile/company-details">Company Details</Link>
        <Link className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition-shadow" to="/profile/csr-history">CSR History Upload</Link>
        <Link className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition-shadow" to="/profile/sdg-selector">ESG/SDG Selector</Link>
      </div>
    </AuthLayout>
  )
}



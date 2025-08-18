export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Create Account</h1>
        <div className="space-y-4">
          <input className="w-full border border-gray-200 rounded-xl p-3" placeholder="Name" />
          <input className="w-full border border-gray-200 rounded-xl p-3" placeholder="Email" />
          <input type="password" className="w-full border border-gray-200 rounded-xl p-3" placeholder="Password" />
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3">Sign up</button>
        </div>
      </div>
    </div>
  )
}

import AuthLayout from './AuthLayout.jsx'

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your SustainAlign account"
      subtitle="Guided onboarding for corporates, NGOs, and regulators"
      footer={<span>Already have an account? <a className="text-emerald-700 hover:underline" href="/login">Sign in</a></span>}
    >
      <h2 className="text-xl font-bold text-gray-900">Get started</h2>
      <p className="text-gray-600 text-sm mb-6">Set up your account to unlock personalized dashboards.</p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">🧑</span>
            <input className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="Jane Doe" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">📧</span>
            <input type="email" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="you@org.org" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">🔒</span>
            <input type="password" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="••••••••" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">✅</span>
            <input type="password" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="••••••••" />
          </div>
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-2 shadow-sm">Create account</button>
        </div>
      </form>
    </AuthLayout>
  )
}



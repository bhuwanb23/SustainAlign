export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Login</h1>
        <div className="space-y-4">
          <input className="w-full border border-gray-200 rounded-xl p-3" placeholder="Email" />
          <input type="password" className="w-full border border-gray-200 rounded-xl p-3" placeholder="Password" />
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3">Sign in</button>
        </div>
      </div>
    </div>
  )
}

import AuthLayout from './AuthLayout.jsx'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Secure sign in"
      subtitle="Minimal, CSR-themed access for corporates, NGOs and regulators"
      footer={<span>New here? <a className="text-emerald-700 hover:underline" href="/signup">Create an account</a></span>}
    >
      <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
      <p className="text-gray-600 text-sm mb-6">Sign in to continue your sustainability journey.</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">👤</span>
            <select className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60">
              <option value="corporate">Corporate</option>
              <option value="ngo">NGO</option>
              <option value="regulator">Regulator</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">📧</span>
            <input type="email" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="you@company.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">🔒</span>
            <input type="password" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="••••••••" />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a className="text-emerald-700 hover:underline" href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-2 shadow-sm">Sign in</button>
      </form>
    </AuthLayout>
  )
}



import AuthLayout from './AuthLayout.jsx'
import { useState } from 'react'
import { apiPost } from '../../lib/api'

export default function SignupPage() {
  const [form, setForm] = useState({ role: 'corporate', name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password || form.password !== form.confirm) {
      setError('Please enter email and matching passwords')
      return
    }
    setLoading(true)
    try {
      const data = await apiPost('/api/auth/signup', { email: form.email, password: form.password, role: form.role })
      localStorage.setItem('token', data.token)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your SustainAlign account"
      subtitle="Guided onboarding for corporates, NGOs, and regulators"
      footer={<span>Already have an account? <a className="text-emerald-700 hover:underline" href="/login">Sign in</a></span>}
    >
      <h2 className="text-xl font-bold text-gray-900">Get started</h2>
      <p className="text-gray-600 text-sm mb-6">Set up your account to unlock personalized dashboards.</p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onSubmit}>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">👥</span>
            <select className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
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
            <input className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">📧</span>
            <input type="email" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="you@org.org" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">🔒</span>
            <input type="password" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">✅</span>
            <input type="password" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          </div>
        </div>
        {error && <div className="md:col-span-2 text-sm text-red-600">{error}</div>}
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-md py-2 shadow-sm">{loading ? 'Creating…' : 'Create account'}</button>
        </div>
      </form>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 max-w-md w-full text-center sa-fade-up">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">✅</div>
            <h3 className="text-2xl font-extrabold text-emerald-700">Account created!</h3>
            <p className="text-gray-700 mt-2">Welcome to SustainAlign. Your account is ready.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <a href="/dashboard" className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Go to dashboard</a>
              <button onClick={() => setSuccess(false)} className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200">Close</button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}



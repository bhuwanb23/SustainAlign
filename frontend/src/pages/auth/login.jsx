import AuthLayout from './AuthLayout.jsx'
import { useState } from 'react'
import { apiPost } from '../../lib/api'

export default function LoginPage() {
  const [form, setForm] = useState({ role: 'corporate', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await apiPost('/api/auth/login', { email: form.email, password: form.password, role: form.role })
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Secure sign in"
      subtitle="Minimal, CSR-themed access for corporates, NGOs and regulators"
      footer={<span>New here? <a className="text-emerald-700 hover:underline" href="/signup">Create an account</a></span>}
    >
      <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
      <p className="text-gray-600 text-sm mb-6">Sign in to continue your sustainability journey.</p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">👤</span>
            <select className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
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
            <input type="email" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">🔒</span>
            <input type="password" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a className="text-emerald-700 hover:underline" href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-md py-2 shadow-sm">{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </AuthLayout>
  )
}



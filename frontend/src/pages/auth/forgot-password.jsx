import AuthLayout from './AuthLayout.jsx'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Password recovery"
      subtitle="Receive a secure reset link or OTP to restore access"
      footer={<a className="text-emerald-700 hover:underline" href="/login">Back to sign in</a>}
    >
      <h2 className="text-xl font-bold text-gray-900">Reset your password</h2>
      <p className="text-gray-600 text-sm mb-6">We’ll email you a link or OTP to create a new password.</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5">📧</span>
            <input type="email" className="w-full border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" placeholder="you@org.org" />
          </div>
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-2 shadow-sm">Send reset</button>
      </form>
    </AuthLayout>
  )
}



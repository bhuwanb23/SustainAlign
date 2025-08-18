import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/dashboard/dashboard.jsx'
import LoginPage from './pages/auth/login.jsx'
import SignupPage from './pages/auth/signup.jsx'
import ForgotPasswordPage from './pages/auth/forgot-password.jsx'
import ProfileSetupPage from './pages/auth/profile-setup.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/profile-setup" element={<ProfileSetupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

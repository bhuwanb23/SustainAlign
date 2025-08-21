import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { clearToken } from '../../lib/auth'

export default function LogoutPage() {
  useEffect(() => {
    clearToken()
  }, [])
  return <Navigate to="/login" replace />
}



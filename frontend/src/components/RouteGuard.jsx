import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, parseJwt, getToken } from '../lib/auth'

export default function RouteGuard({ children }) {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated()) {
            return // Allow unauthenticated users to access auth pages
        }

        // Get user role from JWT
        const token = getToken()
        const payload = parseJwt(token) || {}
        const role = payload.role || 'corporate'

        // If corporate user and new user flag is set, restrict access
        if (role === 'corporate' && localStorage.getItem('newCorporateUser') === 'true') {
            // Only allow access to company details form
            if (location.pathname !== '/profile/company-details') {
                navigate('/profile/company-details', { replace: true })
                return
            }
        }

        // If NGO user and onboarding not complete, restrict access
        if (role === 'ngo' && localStorage.getItem('ngoOnboardingComplete') !== 'true') {
            // Only allow access to NGO onboarding
            if (location.pathname !== '/ngo-onboarding') {
                navigate('/ngo-onboarding', { replace: true })
                return
            }
        }
    }, [location.pathname, navigate])

    return children
}

import { useState, useEffect } from 'react'

export default function AuthStatus() {
  const [authStatus, setAuthStatus] = useState({
    hasToken: false,
    tokenLength: 0,
    tokenPreview: '',
    isLoggedIn: false
  })

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const hasToken = !!token
      const tokenLength = token ? token.length : 0
      const tokenPreview = token ? `${token.substring(0, 10)}...` : ''
      
      setAuthStatus({
        hasToken,
        tokenLength,
        tokenPreview,
        isLoggedIn: hasToken && tokenLength > 10
      })
    }

    checkAuth()
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const clearToken = () => {
    localStorage.removeItem('token')
    setAuthStatus({
      hasToken: false,
      tokenLength: 0,
      tokenPreview: '',
      isLoggedIn: false
    })
  }

  const setDemoToken = () => {
    // Set a demo token for testing (replace with actual token from your auth system)
    const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImRlbW9AdGVjaGNvcnAuY29tIiwicm9sZSI6ImNvcnBvcmF0ZSIsImlhdCI6MTcwMzE2MDAwMCwiZXhwIjoxNzA0MDI0MDAwfQ.demo_signature'
    localStorage.setItem('token', demoToken)
    setAuthStatus({
      hasToken: true,
      tokenLength: demoToken.length,
      tokenPreview: `${demoToken.substring(0, 10)}...`,
      isLoggedIn: true
    })
  }

  return (
    <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm z-50">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">🔐 Authentication Status</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Token Present:</span>
          <span className={authStatus.hasToken ? 'text-green-600' : 'text-red-600'}>
            {authStatus.hasToken ? '✅ Yes' : '❌ No'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Token Length:</span>
          <span className={authStatus.tokenLength > 10 ? 'text-green-600' : 'text-red-600'}>
            {authStatus.tokenLength}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Status:</span>
          <span className={authStatus.isLoggedIn ? 'text-green-600' : 'text-red-600'}>
            {authStatus.isLoggedIn ? '🟢 Logged In' : '🔴 Not Logged In'}
          </span>
        </div>
        
        {authStatus.hasToken && (
          <div className="flex justify-between">
            <span>Token Preview:</span>
            <span className="text-gray-600 font-mono">{authStatus.tokenPreview}</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 space-y-2">
        <button
          onClick={setDemoToken}
          className="w-full px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
        >
          Set Demo Token
        </button>
        
        <button
          onClick={clearToken}
          className="w-full px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
        >
          Clear Token
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>💡 If you're getting "Unauthorized" errors:</p>
        <ol className="list-decimal list-inside mt-1 space-y-1">
          <li>Make sure you're logged in</li>
          <li>Check if the token is valid</li>
          <li>Try setting a demo token above</li>
          <li>Check backend authentication</li>
        </ol>
      </div>
    </div>
  )
}

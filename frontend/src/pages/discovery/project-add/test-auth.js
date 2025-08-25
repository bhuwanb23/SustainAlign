/**
 * Test script to debug authentication issues
 * Run this in the browser console
 */

const testAuth = {
  // Check current authentication status
  checkStatus() {
    console.log('🔍 Checking authentication status...')
    
    const token = localStorage.getItem('token')
    console.log('Token present:', !!token)
    console.log('Token length:', token ? token.length : 0)
    console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'None')
    
    if (token) {
      try {
        // Try to decode JWT (basic check)
        const parts = token.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]))
          console.log('JWT payload:', payload)
          console.log('Expires at:', new Date(payload.exp * 1000))
          console.log('Is expired:', Date.now() > payload.exp * 1000)
        } else {
          console.log('Invalid JWT format')
        }
      } catch (e) {
        console.log('Error decoding JWT:', e.message)
      }
    }
  },

  // Test API endpoint without auth
  testUnauthenticated() {
    console.log('🧪 Testing unauthenticated API call...')
    
    fetch('/api/projects')
      .then(response => {
        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
        return response.text()
      })
      .then(text => {
        console.log('Response body:', text)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  },

  // Test API endpoint with current token
  testAuthenticated() {
    console.log('🧪 Testing authenticated API call...')
    
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('❌ No token found')
      return
    }
    
    fetch('/api/projects', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
        return response.text()
      })
      .then(text => {
        console.log('Response body:', text)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  },

  // Set a demo token for testing
  setDemoToken() {
    console.log('🔑 Setting demo token...')
    
    const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImRlbW9AdGVjaGNvcnAuY29tIiwicm9sZSI6ImNvcnBvcmF0ZSIsImlhdCI6MTcwMzE2MDAwMCwiZXhwIjoxNzA0MDI0MDAwfQ.demo_signature'
    
    localStorage.setItem('token', demoToken)
    console.log('✅ Demo token set')
    this.checkStatus()
  },

  // Clear token
  clearToken() {
    console.log('🗑️ Clearing token...')
    localStorage.removeItem('token')
    console.log('✅ Token cleared')
    this.checkStatus()
  },

  // Run all tests
  runAllTests() {
    console.log('🚀 Running all authentication tests...\n')
    
    this.checkStatus()
    console.log('\n' + '='.repeat(50) + '\n')
    
    this.testUnauthenticated()
    console.log('\n' + '='.repeat(50) + '\n')
    
    this.testAuthenticated()
    
    console.log('\n✅ All tests completed!')
  }
}

// Export for use in browser console
window.testAuth = testAuth

// Auto-run status check
console.log('🔧 Authentication test script loaded.')
console.log('Available commands:')
console.log('- testAuth.checkStatus()')
console.log('- testAuth.testUnauthenticated()')
console.log('- testAuth.testAuthenticated()')
console.log('- testAuth.setDemoToken()')
console.log('- testAuth.clearToken()')
console.log('- testAuth.runAllTests()')

// Run initial status check
testAuth.checkStatus()

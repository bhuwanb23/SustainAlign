const API_BASE_URL = '/api'

/**
 * Create a new project
 * @param {Object} projectData - Project data matching backend model structure
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Created project data
 */
export const createProject = async (projectData, token) => {
  try {
    console.log('🚀 Creating project (no auth required)')
    console.log('📤 Project data:', projectData)
    
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })

    console.log('📥 Response status:', response.status)
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorMessage
        console.log('📥 Error response data:', errorData)
      } catch (e) {
        // If response is not JSON, use status text
        console.log('Non-JSON error response:', response.statusText)
      }
      
      // Handle specific status codes
      if (response.status === 403) {
        errorMessage = 'Access denied. You do not have permission to perform this action.'
      } else if (response.status === 500) {
        errorMessage = 'Server error. Please try again later.'
      }
      
      throw new Error(errorMessage)
    }

    const result = await response.json()
    console.log('✅ Project created successfully:', result)
    return result
  } catch (error) {
    console.error('❌ Error creating project:', error)
    throw error
  }
}

/**
 * Get all projects with optional filtering
 * @param {Object} filters - Filter parameters
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Projects list and total count
 */
export const getProjects = async (filters = {}, token) => {
  try {
    const queryParams = new URLSearchParams()
    
    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    const url = `${API_BASE_URL}/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

/**
 * Get a specific project by ID
 * @param {number} projectId - Project ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Project data
 */
export const getProject = async (projectId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching project:', error)
    throw error
  }
}

/**
 * Update an existing project
 * @param {number} projectId - Project ID
 * @param {Object} projectData - Updated project data
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Updated project data
 */
export const updateProject = async (projectId, projectData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

/**
 * Delete a project
 * @param {number} projectId - Project ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Success message
 */
export const deleteProject = async (projectId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

/**
 * Get project milestones
 * @param {number} projectId - Project ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Milestones list
 */
export const getProjectMilestones = async (projectId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/milestones`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching project milestones:', error)
    throw error
  }
}

/**
 * Create a project milestone
 * @param {number} projectId - Project ID
 * @param {Object} milestoneData - Milestone data
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Created milestone data
 */
export const createProjectMilestone = async (projectId, milestoneData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/milestones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(milestoneData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating project milestone:', error)
    throw error
  }
}

/**
 * Get all NGOs with optional filtering
 * @param {Object} filters - Filter parameters
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} NGOs list and total count
 */
export const getNGOs = async (filters = {}, token) => {
  try {
    const queryParams = new URLSearchParams()
    
    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    const url = `${API_BASE_URL}/ngos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching NGOs:', error)
    throw error
  }
}

/**
 * Get a specific NGO by ID
 * @param {number} ngoId - NGO ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} NGO data
 */
export const getNGO = async (ngoId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ngos/${ngoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching NGO:', error)
    throw error
  }
}

// Approvals API
export const getApprovals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/approvals`, { method: 'GET' })
    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error || `HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching approvals:', error)
    throw error
  }
}

export const getApproval = async (approvalId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/approvals/${approvalId}`, { method: 'GET' })
    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error || `HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching approval:', error)
    throw error
  }
}

export const updateApprovalStepStatus = async (approvalId, stepId, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/approvals/${approvalId}/steps/${stepId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error || `HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating approval step:', error)
    throw error
  }
}

export const createApproval = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/approvals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error || `HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating approval:', error)
    throw error
  }
}

// AI Matching API
export const getAiMatches = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams()
    
    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    const url = `${API_BASE_URL}/ai-matches${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching AI matches:', error)
    throw error
  }
}

export const createAiMatch = async (matchData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(matchData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating AI match:', error)
    throw error
  }
}

// Impact Dashboard API
export const getImpactSnapshot = async (companyId = null) => {
  try {
    const queryParams = new URLSearchParams()
    if (companyId) queryParams.append('company_id', companyId)
    
    const url = `${API_BASE_URL}/impact/overview${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.cards || []
  } catch (error) {
    console.error('Error fetching impact snapshot:', error)
    throw error
  }
}

export const getImpactTimeSeries = async (metricName, filters = {}) => {
  try {
    const queryParams = new URLSearchParams()
    queryParams.append('metric', metricName)
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    const url = `${API_BASE_URL}/impact/trends${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.series || []
  } catch (error) {
    console.error('Error fetching impact time series:', error)
    throw error
  }
}

export const getImpactRegionStats = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    const url = `${API_BASE_URL}/impact/regions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.rows || []
  } catch (error) {
    console.error('Error fetching impact region stats:', error)
    throw error
  }
}

export const getImpactGoals = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    const url = `${API_BASE_URL}/impact/goals${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.goals || []
  } catch (error) {
    console.error('Error fetching impact goals:', error)
    throw error
  }
}

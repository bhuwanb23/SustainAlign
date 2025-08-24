import { useState } from 'react'
import { requiredFields } from '../constants/index.js'

export default function useProjectAdd() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const addProject = async (projectData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically make an API call to save the project
      console.log('Adding project:', projectData)
      
      // Validate required fields
      const missingFields = requiredFields.filter(field => !projectData[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }
      
      // For now, we'll just log the data and simulate success
      const newProject = {
        id: Date.now(),
        ...projectData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        // Map old field names for backward compatibility
        projectName: projectData.projectTitle,
        organization: projectData.ngoName,
        description: projectData.shortDescription,
        sdgs: projectData.sdgGoals || []
      }
      
      // Store in localStorage for demo purposes
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]')
      existingProjects.push(newProject)
      localStorage.setItem('projects', JSON.stringify(existingProjects))
      
      setSuccess(true)
      return newProject
    } catch (error) {
      console.error('Error adding project:', error)
      setError(error.message || 'Failed to add project. Please try again.')
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetState = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    addProject,
    isSubmitting,
    error,
    success,
    resetState
  }
}

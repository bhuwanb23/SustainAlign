import { useState } from 'react'

export default function useProjectAdd() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addProject = async (projectData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically make an API call to save the project
      console.log('Adding project:', projectData)
      
      // For now, we'll just log the data and simulate success
      const newProject = {
        id: Date.now(),
        ...projectData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0
      }
      
      // You could store this in localStorage for demo purposes
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]')
      existingProjects.push(newProject)
      localStorage.setItem('projects', JSON.stringify(existingProjects))
      
      return newProject
    } catch (error) {
      console.error('Error adding project:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    addProject,
    isSubmitting
  }
}

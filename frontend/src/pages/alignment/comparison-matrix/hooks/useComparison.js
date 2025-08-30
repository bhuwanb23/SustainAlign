import { useEffect, useState } from 'react'
import { getComparison, getOrCreateDefaultComparison, removeProjectFromComparison } from '../../../../lib/comparisonApi'

export default function useComparison() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comparison, setComparison] = useState(null)
  const [removingProjectId, setRemovingProjectId] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Get or create a default comparison for the user
        const defaultComparison = await getOrCreateDefaultComparison()
        setComparison(defaultComparison)
        
        // Extract projects from the comparison
        if (defaultComparison && defaultComparison.items) {
          const projectData = defaultComparison.items.map(item => {
            const project = item.project
            if (!project) return null
            
            const mappedProject = {
              id: project.id,
              name: project.title || 'Untitled Project',
              organization: project.ngo_name || 'NGO Organization',
              cost: Number(project.financials?.total_project_cost) || 0,
              fundingRequired: Number(project.financials?.funding_required) || 0,
              durationMonths: Number(project.timeline?.duration_months) || 0,
              pastProjectsCompleted: Number(project.ngo_credibility?.past_projects_completed) || 0,
              sdg: project.sdg_goals || [],
              esg: project.esg_rating || null,
              risk: project.risk_level || null,
              notes: item.notes || '',
              priority: item.priority || 0,
              addedAt: item.added_at
            }
            
            return mappedProject
          }).filter(Boolean)
          
          setProjects(projectData)
        } else {
          setProjects([])
        }
        
      } catch (e) {
        console.error('Error loading comparison data:', e)
        setError('Failed to load comparison data. Please try again.')
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const selectedCount = projects.length
  
  // Remove a project from the comparison
  const removeProject = async (comparisonId, projectId) => {
    try {
      setLoading(true)
      setRemovingProjectId(projectId) // Set the project being removed
      
      // Call the API to remove the project
      await removeProjectFromComparison(comparisonId, projectId)
      
      // Show success message
      const projectName = projects.find(p => p.id === projectId)?.name || 'Project'
      alert(`${projectName} has been removed from the comparison successfully!`)
      
      // Refresh the comparison data to get the updated list
      await refreshComparison()
      
    } catch (e) {
      console.error('Error removing project from comparison:', e)
      setError('Failed to remove project from comparison.')
    } finally {
      setLoading(false)
      setRemovingProjectId(null) // Reset the project being removed
    }
  }
  
  // Refresh the comparison data
  const refreshComparison = async () => {
    if (!comparison) return
    
    try {
      setLoading(true)
      const updatedComparison = await getComparison(comparison.id)
      setComparison(updatedComparison)
      
      // Update projects list
      if (updatedComparison && updatedComparison.items) {
        const projectData = updatedComparison.items.map(item => {
          const project = item.project
          if (!project) return null
          
          return {
            id: project.id,
            name: project.title || 'Untitled Project',
            organization: project.ngo_name || 'NGO Organization',
            cost: Number(project.financials?.total_project_cost) || 0,
            fundingRequired: Number(project.financials?.funding_required) || 0,
            durationMonths: Number(project.timeline?.duration_months) || 0,
            pastProjectsCompleted: Number(project.ngo_credibility?.past_projects_completed) || 0,
            sdg: project.sdg_goals || [],
            esg: project.esg_rating || null,
            risk: project.risk_level || null,
            notes: item.notes || '',
            priority: item.priority || 0,
            addedAt: item.added_at
          }
        }).filter(Boolean)
        
        setProjects(projectData)
      }
    } catch (e) {
      console.error('Error refreshing comparison:', e)
      setError('Failed to refresh comparison data.')
    } finally {
      setLoading(false)
    }
  }

  return { 
    projects, 
    selectedCount, 
    loading, 
    error, 
    comparison,
    refreshComparison,
    removeProject,
    removingProjectId
  }
}



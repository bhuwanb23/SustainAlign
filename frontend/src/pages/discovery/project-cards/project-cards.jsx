import { useState, useEffect } from 'react'
import useProjectCards from './hooks/useProjectCards.js'
import ProjectCard from './components/ProjectCard.jsx'
import ProjectDetailsView from './components/ProjectDetailsView.jsx'
import { createApproval } from '../../../lib/projectApi.js'
import { addProjectToComparison, getOrCreateDefaultComparison } from '../../../lib/comparisonApi.js'

export default function ProjectCardsPage() {
  const { projects, loading } = useProjectCards()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [comparisonLoading, setComparisonLoading] = useState(false)
  const [comparisonProjects, setComparisonProjects] = useState([])

  // Load current comparison projects on component mount
  useEffect(() => {
    const loadComparisonProjects = async () => {
      try {
        const comparison = await getOrCreateDefaultComparison()
        setComparisonProjects(comparison.items || [])
      } catch (error) {
        console.error('Error loading comparison projects:', error)
        setComparisonProjects([])
      }
    }

    loadComparisonProjects()
  }, [])

  // Function to refresh comparison projects
  const refreshComparisonProjects = async () => {
    try {
      const comparison = await getOrCreateDefaultComparison()
      setComparisonProjects(comparison.items || [])
    } catch (error) {
      console.error('Error refreshing comparison projects:', error)
    }
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setShowDetails(true)
  }

  const handleCompare = async (project) => {
    try {
      setComparisonLoading(true)
      
      // Get or create a default comparison
      const comparison = await getOrCreateDefaultComparison()
      
      // Check if project is already in the comparison
      const isAlreadyInComparison = comparison.items && 
        comparison.items.some(item => item.project_id === project.id)
      
      if (isAlreadyInComparison) {
        // Project is already in comparison, just navigate to it
        alert('This project is already in your comparison!')
        window.location.href = '/alignment/comparison-matrix'
        return
      }
      
      // Add the project to the comparison
      await addProjectToComparison(comparison.id, project.id)
      
      // Refresh comparison projects
      await refreshComparisonProjects()
      
      // Show success message
      alert('Project added to comparison successfully!')
      
      // Navigate to comparison matrix
      window.location.href = '/alignment/comparison-matrix'
      
    } catch (error) {
      console.error('Error adding project to comparison:', error)
      
      // Handle specific error cases
      if (error.message.includes('Project already in comparison')) {
        alert('This project is already in your comparison!')
        window.location.href = '/alignment/comparison-matrix'
      } else {
        alert('Failed to add project to comparison. Please try again.')
      }
    } finally {
      setComparisonLoading(false)
    }
  }

  const handleApply = async (project) => {
    try {
      const approvalData = {
        project_id: project.id,
        company_id: 1, // TODO: Get from user context
        proposed_amount: project.fundingRequired || project.budget || 0,
        proposed_timeline: project.timeline || '12 months',
        justification: `Applying for ${project.projectName} based on alignment with our CSR goals.`,
        status: 'pending'
      }
      
      await createApproval(approvalData)
      
      // Navigate to approval page
      window.location.href = '/decision/approval'
      
    } catch (error) {
      console.error('Error creating approval:', error)
      alert('Failed to create approval. Please try again.')
    }
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (showDetails && selectedProject) {
    return (
      <ProjectDetailsView 
        project={selectedProject} 
        onClose={handleCloseDetails}
        onCompare={() => handleCompare(selectedProject)}
        onApply={() => handleApply(selectedProject)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Discovery</h1>
              <p className="mt-2 text-gray-600">Browse and evaluate CSR projects from verified NGOs</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {projects.length} projects available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
                onCompare={() => handleCompare(project)}
                onApply={() => handleApply(project)}
                comparisonLoading={comparisonLoading}
                isInComparison={comparisonProjects.some(item => item.project_id === project.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



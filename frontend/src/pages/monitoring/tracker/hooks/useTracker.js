import { useMemo, useState, useCallback, useEffect } from 'react'
import { getTrackerProjects, getTrackerTimeline, getProjects } from '../../../../lib/projectApi'

const SDG = {
  green: '#4CAF50',
  teal: '#009688',
  blue: '#2196F3',
  orange: '#FF9800',
}

// Helper function to transform project data for ProjectCard
const transformProjectForCard = (project) => {
  // If it's already in the correct format (from tracker), return as is
  if (project.gradientFrom && project.gradientTo) {
    return project
  }
  
  // Transform regular project data to match ProjectCard format
  const statusColors = {
    'funded': { bg: '#10B981', textColor: '#FFFFFF' }, // Green for approved
    'draft': { bg: '#6B7280', textColor: '#FFFFFF' },
    'published': { bg: '#3B82F6', textColor: '#FFFFFF' },
    'completed': { bg: '#059669', textColor: '#FFFFFF' },
    'on-track': { bg: '#10B981', textColor: '#FFFFFF' },
    'delayed': { bg: '#F59E0B', textColor: '#FFFFFF' }
  }
  
  const statusText = {
    'funded': 'Approved',
    'draft': 'Draft',
    'published': 'Published',
    'completed': 'Completed',
    'on-track': 'On Track',
    'delayed': 'Delayed'
  }
  
  const status = project.status || 'draft'
  const colors = statusColors[status] || statusColors['draft']
  
  // Safely access nested properties
  const organizationName = project.organization?.name || 
                          project.ngo?.name || 
                          project.company?.company_name ||
                          'Unknown Organization'
  
  const endDate = project.end_date || project.endDate || project.target_date
  const progress = project.progress || project.progress_percentage || 0
  const impactScore = project.impact_score || project.impactScore || 'No metrics'
  
  return {
    ...project,
    id: project.id,
    title: project.title || 'Untitled Project',
    subtitle: organizationName,
    icon: '📋',
    gradientFrom: '#4F46E5',
    gradientTo: '#7C3AED',
    badge: {
      text: statusText[status],
      bg: colors.bg,
      textColor: colors.textColor
    },
    progressPct: progress,
    progressFrom: '#10B981',
    progressTo: '#059669',
    due: endDate ? new Date(endDate).toLocaleDateString() : 'No due date',
    metricLabel: impactScore !== 'No metrics' ? `Impact: ${impactScore}` : 'No metrics',
    team: project.team_user_ids || project.team_ids || [1, 2, 3], // Default team avatars
    cta: {
      label: 'View Details',
      color: '#4F46E5'
    },
    tooltip: project.description || 'Click to view project details'
  }
}

export default function useTracker() {
  const [filter, setFilter] = useState('all') // all | on-track | delayed | completed | approved
  const [projects, setProjects] = useState([])
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tracker data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Fetching tracker data...')
      
      // Fetch both tracker projects and approved projects
      const [trackerProjectsData, timelineData, approvedProjectsData] = await Promise.all([
        getTrackerProjects({ status: filter === 'all' ? undefined : filter }),
        getTrackerTimeline(),
        getProjects({ status: 'funded' }) // Get projects that have been approved
      ])
      
      // Also fetch published projects (which are approved through the workflow)
      const publishedProjectsData = await getProjects({ status: 'published' })
      
      console.log('📊 Tracker projects:', trackerProjectsData)
      console.log('📈 Timeline data:', timelineData)
      console.log('✅ Approved projects (funded):', approvedProjectsData)
      console.log('📋 Published projects (approved):', publishedProjectsData)
      
      // Handle different API response formats
      const trackerProjects = Array.isArray(trackerProjectsData) ? trackerProjectsData : []
      const approvedProjects = approvedProjectsData?.projects || approvedProjectsData || []
      const publishedProjects = publishedProjectsData?.projects || publishedProjectsData || []
      
      // Combine tracker projects with approved AND published projects
      const allProjects = [
        ...trackerProjects,
        ...approvedProjects,
        ...publishedProjects
      ]
      
      console.log('🔗 Combined projects:', allProjects)
      
      // Remove duplicates based on project ID
      const uniqueProjects = allProjects.filter((project, index, self) => 
        index === self.findIndex(p => p.id === project.id)
      )
      
      console.log('✨ Unique projects after deduplication:', uniqueProjects)
      
      // Transform all projects to the correct format
      const transformedProjects = uniqueProjects.map(transformProjectForCard)
      
      console.log('🎨 Transformed projects:', transformedProjects)
      
      setProjects(transformedProjects)
      setTimeline(timelineData)
    } catch (err) {
      console.error('❌ Error fetching tracker data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    if (filter === 'approved') return projects.filter((p) => p.status === 'funded' || p.status === 'published')
    return projects.filter((p) => p.status === filter)
  }, [filter, projects])

  return { 
    filter, 
    setFilter, 
    projects: filtered, 
    timeline,
    loading,
    error,
    refreshData: fetchData
  }
}

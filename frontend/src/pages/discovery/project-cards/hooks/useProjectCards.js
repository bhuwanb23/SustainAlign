import { useState, useEffect } from 'react'

export default function useProjectCards() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = () => {
      try {
        // Load projects from localStorage (added via project-add)
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]')

        // Normalize stored projects to card schema and ensure unique IDs
        const normalizedStored = storedProjects.map((p, idx) => ({
          id: p.id || `stored-${p.createdAt || Date.now()}-${idx}`,
          projectName: p.projectTitle || p.title || 'Untitled Project',
          organization: p.organization || p.ngoName || p.ngo_name || 'NGO',
          description: p.shortDescription || p.short_description || '',
          impactArea: p.impactArea || 'Environment',
          location: typeof p.location === 'string' ? p.location : (p.location?.city || p.location_city || ''),
          budget: p.totalProjectCost || p.financials?.total_project_cost || p.budget || 0,
          timeline: p.timeline || `${p.timeline?.start || p.start_date || ''} - ${p.timeline?.end || p.end_date || ''}`,
          sdgs: p.sdgs || p.sdgGoals || p.sdg_goals || [],
          status: p.status || 'active',
          createdAt: p.createdAt || p.created_at || new Date().toISOString(),
          views: p.views || 0,
          likes: p.likes || 0
        }))
        
        // Combine with default projects
        const defaultProjects = [
          {
            id: 1,
            projectName: 'Clean Water Initiative',
            organization: 'WaterAid India',
            description: 'Providing clean drinking water to rural communities through sustainable water purification systems.',
            impactArea: 'Water & Sanitation',
            location: 'Rural Maharashtra, India',
            budget: 50000,
            timeline: '1-2 years',
            sdgs: ['Clean Water', 'Good Health'],
            contactEmail: 'contact@wateraidindia.org',
            website: 'https://wateraidindia.org',
            status: 'active',
            createdAt: '2024-01-15T10:00:00Z',
            views: 245,
            likes: 18
          },
          {
            id: 2,
            projectName: 'Solar Energy for Schools',
            organization: 'Green Energy Foundation',
            description: 'Installing solar panels in government schools to provide reliable electricity and reduce carbon emissions.',
            impactArea: 'Clean Energy',
            location: 'Karnataka, India',
            budget: 75000,
            timeline: '6-12 months',
            sdgs: ['Clean Energy', 'Quality Education', 'Climate Action'],
            contactEmail: 'info@greenenergyfoundation.org',
            website: 'https://greenenergyfoundation.org',
            status: 'active',
            createdAt: '2024-01-10T14:30:00Z',
            views: 189,
            likes: 23
          },
          {
            id: 3,
            projectName: 'Women Empowerment through Skills Training',
            organization: 'Empower Women NGO',
            description: 'Providing vocational training and entrepreneurship skills to women from marginalized communities.',
            impactArea: 'Women Empowerment',
            location: 'Delhi, India',
            budget: 35000,
            timeline: '1-2 years',
            sdgs: ['Gender Equality', 'Decent Work', 'No Poverty'],
            contactEmail: 'hello@empowerwomen.org',
            website: 'https://empowerwomen.org',
            status: 'active',
            createdAt: '2024-01-05T09:15:00Z',
            views: 312,
            likes: 45
          },
          {
            id: 4,
            projectName: 'Digital Literacy Program',
            organization: 'Tech for Good Foundation',
            description: 'Teaching computer skills and digital literacy to underprivileged youth to improve employability.',
            impactArea: 'Education',
            location: 'Hyderabad, India',
            budget: 40000,
            timeline: '1-2 years',
            sdgs: ['Quality Education', 'Decent Work'],
            contactEmail: 'contact@techforgood.org',
            website: 'https://techforgood.org',
            status: 'active',
            createdAt: '2024-01-01T11:45:00Z',
            views: 178,
            likes: 29
          },
          {
            id: 5,
            projectName: 'Organic Farming Initiative',
            organization: 'Sustainable Agriculture Trust',
            description: 'Training farmers in organic farming techniques to improve soil health and increase crop yields.',
            impactArea: 'Agriculture',
            location: 'Punjab, India',
            budget: 60000,
            timeline: '2+ years',
            sdgs: ['Zero Hunger', 'Climate Action', 'Life on Land'],
            contactEmail: 'info@sustainableagriculture.org',
            website: 'https://sustainableagriculture.org',
            status: 'active',
            createdAt: '2023-12-28T16:20:00Z',
            views: 203,
            likes: 34
          },
          {
            id: 6,
            projectName: 'Healthcare Mobile Clinic',
            organization: 'Health for All Foundation',
            description: 'Operating mobile medical clinics to provide healthcare services to remote villages.',
            impactArea: 'Healthcare',
            location: 'Rajasthan, India',
            budget: 45000,
            timeline: '1-2 years',
            sdgs: ['Good Health', 'No Poverty'],
            contactEmail: 'contact@healthforall.org',
            website: 'https://healthforall.org',
            status: 'active',
            createdAt: '2023-12-25T13:10:00Z',
            views: 267,
            likes: 41
          }
        ]

        const allProjects = [...defaultProjects, ...normalizedStored]
        
        // Sort by creation date (newest first)
        allProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
        setProjects(allProjects)
      } catch (error) {
        console.error('Error loading projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    // Simulate loading delay
    const timer = setTimeout(loadProjects, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return {
    projects,
    loading
  }
}



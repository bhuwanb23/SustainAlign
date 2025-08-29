import { useState, useEffect } from 'react'
import { getProjects } from '../../../../lib/projectApi'

export default function useProjectCards() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await getProjects()
        const apiProjects = Array.isArray(res?.projects) ? res.projects : []
        // Map backend project model to card schema
        const normalized = apiProjects.map((p) => ({
          id: p.id,
          projectName: p.title || 'Untitled Project',
          organization: p.ngo_name || 'NGO',
          description: p.short_description || '',
          impactArea: (p.csr_focus_areas && p.csr_focus_areas[0]) || 'Environment',
          location: p.location?.region || p.location_region || p.location?.city || p.location_city || p.location?.country || p.location_country || '',
          budget: p.financials?.funding_required ?? p.funding_required ?? 0,
          timeline: `${p.timeline?.start_date || p.timeline?.start || p.start_date || ''} - ${p.timeline?.end_date || p.timeline?.end || p.end_date || ''}`,
          sdgs: p.sdg_goals || [],
          status: p.status || 'active',
          createdAt: p.created_at || new Date().toISOString(),
          views: 0,
          likes: 0,
          __full: p,
        }))
        setProjects(normalized)
      } catch (error) {
        console.error('Error loading projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return {
    projects,
    loading
  }
}



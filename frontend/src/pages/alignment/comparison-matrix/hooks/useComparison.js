import { useEffect, useState } from 'react'
import { getProject } from '../../../../lib/projectApi'

export default function useComparison() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const load = async () => {
      let items = []
      try {
        items = JSON.parse(localStorage.getItem('comparisonSelected') || '[]')
        if (!Array.isArray(items)) items = []
      } catch (e) {
        items = []
      }

      // Enrich any missing fields by fetching from API
      try {
        const enriched = await Promise.all(items.map(async (p) => {
          if (p && p.id && (p.fundingRequired == null || p.durationMonths == null || !p.sdg || !p.name)) {
            try {
              const full = await getProject(p.id)
              const merged = {
                ...p,
                name: p.name || full.title,
                cost: p.cost ?? (full.financials?.total_project_cost ?? 0),
                fundingRequired: p.fundingRequired ?? (full.financials?.funding_required ?? 0),
                durationMonths: p.durationMonths ?? (full.timeline?.duration_months ?? null),
                pastProjectsCompleted: p.pastProjectsCompleted ?? (full.ngo_credibility?.past_projects_completed ?? null),
                sdg: p.sdg && p.sdg.length ? p.sdg : (full.sdg_goals || []),
                esg: p.esg ?? full.esg_rating,
                risk: p.risk ?? full.risk_level,
              }
              return merged
            } catch (e) {
              return p
            }
          }
          return p
        }))
        setProjects(enriched)
      } catch (e) {
        setProjects(items)
      }
    }

    load()
  }, [])

  const selectedCount = projects.length
  return { projects, selectedCount }
}



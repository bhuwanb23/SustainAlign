import { useMemo, useState, useCallback, useEffect } from 'react'
import { getAuditEvents, getAuditSummary } from '../../../../lib/projectApi'

function normalize(str) {
  return String(str || '').toLowerCase()
}

export default function useAuditTrail() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [events, setEvents] = useState([])
  const [summary, setSummary] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch audit events and summary
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [eventsData, summaryData] = await Promise.all([
        getAuditEvents(),
        getAuditSummary()
      ])
      
      setEvents(eventsData)
      setSummary(summaryData)
    } catch (err) {
      console.error('Error fetching audit data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Transform audit events to match frontend format
  const transformEvent = useCallback((event) => {
    const getCategoryFromEntityType = (entityType) => {
      switch (entityType) {
        case 'ai_match': return 'ai'
        case 'approval': return 'approval'
        case 'compliance': return 'compliance'
        case 'project': return 'project'
        case 'report': return 'report'
        default: return 'system'
      }
    }

    const getStatusFromAction = (action) => {
      switch (action) {
        case 'created': return 'Created'
        case 'updated': return 'Updated'
        case 'deleted': return 'Deleted'
        case 'approved': return 'Approved'
        case 'rejected': return 'Rejected'
        case 'status_changed': return 'Status Changed'
        case 'generated': return 'Generated'
        case 'risk_assessment': return 'Risk Assessment'
        default: return action
      }
    }

    const getStatusColor = (action) => {
      switch (action) {
        case 'approved': return 'emerald'
        case 'rejected': return 'red'
        case 'created': return 'blue'
        case 'updated': return 'blue'
        case 'deleted': return 'red'
        case 'generated': return 'blue'
        case 'risk_assessment': return 'yellow'
        default: return 'blue'
      }
    }

    const category = getCategoryFromEntityType(event.entityType)
    const statusText = getStatusFromAction(event.action)
    const statusColor = getStatusColor(event.action)
    
    return {
      id: event.id.toString(),
      category,
      title: event.message || `${event.action} ${event.entityType}`,
      timeAgo: new Date(event.createdAt).toLocaleString(),
      badgeText: event.actorRole || 'System',
      statusDot: `bg-${statusColor}-500`,
      statusText,
      statusColor: `text-${statusColor}-600`,
      borderColor: `border-${statusColor}-500`,
      chipBg: `bg-${statusColor}-100`,
      chipText: `text-${statusColor}-700`,
      summary: event.message || `${event.action} performed on ${event.entityType}`,
      meta: `${event.actorRole || 'System'} • ID: ${event.entityType.toUpperCase()}-${event.id}`,
      rawEvent: event
    }
  }, [])

  const entries = useMemo(() => {
    return events.map(transformEvent)
  }, [events, transformEvent])

  const details = useMemo(() => {
    const detailsMap = {}
    
    const getStatusColor = (action) => {
      switch (action) {
        case 'approved': return 'emerald'
        case 'rejected': return 'red'
        case 'created': return 'blue'
        case 'updated': return 'blue'
        case 'deleted': return 'red'
        case 'generated': return 'blue'
        case 'risk_assessment': return 'yellow'
        default: return 'blue'
      }
    }
    
    events.forEach(event => {
      const eventId = event.id.toString()
      const statusColor = getStatusColor(event.action)
      
      // Create detail card based on event metadata
      const items = []
      if (event.metadata) {
        Object.entries(event.metadata).forEach(([key, value]) => {
          items.push([key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value.toString()])
        })
      }
      
      // Add basic event info
      items.unshift(['Entity Type', event.entityType])
      items.unshift(['Action', event.action])
      if (event.actorRole) {
        items.unshift(['Actor Role', event.actorRole])
      }
      if (event.source) {
        items.unshift(['Source', event.source])
      }
      
      detailsMap[eventId] = {
        cardBg: `bg-${statusColor}-50`,
        cardBorder: `border-${statusColor}-200`,
        title: 'Event Details',
        titleColor: `text-${statusColor}-800`,
        items: items.length > 0 ? items : [['No additional details available', '']]
      }
    })
    
    return detailsMap
  }, [events])

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      if (typeFilter !== 'all' && e.category !== typeFilter) return false
      if (statusFilter !== 'all') {
        const statusNorm = normalize(e.statusText)
        if (normalize(statusFilter) !== statusNorm) return false
      }
      if (query) {
        const q = normalize(query)
        const hay = `${e.title} ${e.summary} ${e.meta}`
        if (!normalize(hay).includes(q)) return false
      }
      return true
    })
  }, [entries, query, typeFilter, statusFilter])

  const calculatedSummary = useMemo(() => {
    const ai = entries.filter((e) => e.category === 'ai').length
    const approvals = entries.filter((e) => e.statusText === 'Approved').length
    const rejections = entries.filter((e) => e.statusText === 'Rejected').length
    const total = entries.length
    
    return {
      ai, 
      approvals, 
      rejections,
      total,
      complianceScorePct: summary.total_events > 0 ? Math.round((summary.recent_events / summary.total_events) * 100) : 0,
      riskLevelText: 'Low',
      riskAverage: 2.1,
      entityCounts: summary.entity_counts || {},
      actionCounts: summary.action_counts || {},
      sourceCounts: summary.source_counts || {}
    }
  }, [entries, summary])

  const toggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  const onExport = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert('Exporting audit logs...')
  }, [])

  const onAddEntry = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert('Open New Entry modal...')
  }, [])

  return {
    query, setQuery,
    typeFilter, setTypeFilter,
    statusFilter, setStatusFilter,
    dateFilter, setDateFilter,
    entries: filteredEntries,
    details,
    expandedId,
    toggle,
    summary: calculatedSummary,
    loading,
    error,
    onExport,
    onAddEntry,
    refreshData: fetchData,
  }
}



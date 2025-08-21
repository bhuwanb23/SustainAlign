import { useMemo, useState, useCallback } from 'react'

function normalize(str) {
  return String(str || '').toLowerCase()
}

export default function useAuditTrail() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const entries = useMemo(() => [
    {
      id: 'e1',
      category: 'ai',
      title: 'Risk Assessment Algorithm Update',
      timeAgo: '2 hours ago',
      badgeText: 'AI Recommendation',
      statusDot: 'bg-blue-500',
      statusText: 'Neutral',
      statusColor: 'text-blue-600',
      borderColor: 'border-blue-500',
      chipBg: 'bg-blue-100',
      chipText: 'text-blue-700',
      summary: 'AI system recommends updating risk assessment parameters based on recent market volatility patterns.',
      meta: 'System AI • ID: RAU-2024-001',
    },
    {
      id: 'e2',
      category: 'approval',
      title: 'ESG Investment Policy Amendment',
      timeAgo: '4 hours ago',
      badgeText: 'Manager Approval',
      statusDot: 'bg-emerald-500',
      statusText: 'Approved',
      statusColor: 'text-emerald-600',
      borderColor: 'border-emerald-500',
      chipBg: 'bg-emerald-100',
      chipText: 'text-emerald-700',
      summary: 'Senior management approved new ESG criteria for investment screening process.',
      meta: 'Sarah Chen, CRO • ID: EPA-2024-002',
    },
    {
      id: 'e3',
      category: 'compliance',
      title: 'High-Risk Transaction Alert',
      timeAgo: '6 hours ago',
      badgeText: 'Compliance Action',
      statusDot: 'bg-red-500',
      statusText: 'Rejected',
      statusColor: 'text-red-600',
      borderColor: 'border-red-500',
      chipBg: 'bg-red-100',
      chipText: 'text-red-700',
      summary: 'Compliance system flagged and rejected suspicious transaction exceeding risk thresholds.',
      meta: 'Compliance Engine • ID: HRT-2024-003',
    },
    {
      id: 'e4',
      category: 'ai',
      title: 'Customer Due Diligence Enhancement',
      timeAgo: '1 day ago',
      badgeText: 'AI Recommendation',
      statusDot: 'bg-blue-500',
      statusText: 'Neutral',
      statusColor: 'text-blue-600',
      borderColor: 'border-blue-500',
      chipBg: 'bg-blue-100',
      chipText: 'text-blue-700',
      summary: 'AI suggests implementing enhanced KYC procedures for high-value client onboarding.',
      meta: 'Compliance AI • ID: CDD-2024-004',
    },
  ], [])

  const details = useMemo(() => ({
    e1: {
      cardBg: 'bg-blue-50',
      cardBorder: 'border-blue-200',
      title: 'Detailed Analysis',
      titleColor: 'text-blue-800',
      items: [
        ['Risk Level', 'Medium (7.2/10)'],
        ['Affected Systems', 'Portfolio Management, Compliance Engine'],
        ['Recommendation', 'Implement updated volatility thresholds within 48 hours'],
        ['Impact Assessment', 'Potential 15% improvement in risk detection accuracy'],
      ],
    },
    e2: {
      cardBg: 'bg-emerald-50',
      cardBorder: 'border-emerald-200',
      title: 'Approval Details',
      titleColor: 'text-emerald-800',
      items: [
        ['Approval Authority', 'Chief Risk Officer'],
        ['Policy Version', 'ESG-2024-v3.1'],
        ['Effective Date', 'January 15, 2024'],
        ['Review Period', 'Quarterly assessment required'],
      ],
    },
    e3: {
      cardBg: 'bg-red-50',
      cardBorder: 'border-red-200',
      title: 'Compliance Action Details',
      titleColor: 'text-red-800',
      items: [
        ['Transaction ID', 'TXN-2024-789456'],
        ['Risk Score', '9.8/10 (Critical)'],
        ['Violation Type', 'AML threshold exceeded'],
        ['Action Taken', 'Transaction blocked, investigation initiated'],
      ],
    },
    e4: {
      cardBg: 'bg-blue-50',
      cardBorder: 'border-blue-200',
      title: 'Enhancement Proposal',
      titleColor: 'text-blue-800',
      items: [
        ['Target Segment', 'Clients with >$10M portfolio value'],
        ['Additional Checks', 'Enhanced source of funds verification'],
        ['Implementation Time', '2-3 weeks'],
        ['Expected Outcome', '40% reduction in onboarding risks'],
      ],
    },
  }), [])

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

  const summary = useMemo(() => {
    const ai = entries.filter((e) => e.category === 'ai').length
    const approvals = entries.filter((e) => e.statusText === 'Approved').length
    const rejections = entries.filter((e) => e.statusText === 'Rejected').length
    return {
      ai, approvals, rejections,
      complianceScorePct: 94.2,
      riskLevelText: 'Low',
      riskAverage: 2.1,
    }
  }, [entries])

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
    summary,
    onExport,
    onAddEntry,
  }
}



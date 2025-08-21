import { useMemo, useState } from 'react'

const SDG = {
  green: '#4CAF50',
  teal: '#009688',
  blue: '#2196F3',
  orange: '#FF9800',
}

export default function useTracker() {
  const [filter, setFilter] = useState('all') // all | on-track | delayed | completed

  const projects = useMemo(
    () => [
      {
        id: 'p1',
        title: 'Clean Water Initiative',
        subtitle: 'Rural Communities Development',
        status: 'on-track',
        badge: { text: 'On Track', bg: '#DCFCE7', textColor: '#166534' },
        progressPct: 65,
        due: 'Due: Dec 2024',
        metricLabel: 'Water Access',
        icon: '🌱',
        gradientFrom: '#4ade80',
        gradientTo: '#16a34a',
        progressFrom: SDG.green,
        progressTo: '#4ade80',
        metricColor: SDG.teal,
        tooltip: 'Budget: $45,000 spent | Partner: GreenEarth NGO',
        team: [1, 2, 3],
        cta: { label: 'View Details', color: SDG.green },
      },
      {
        id: 'p2',
        title: 'Education for All',
        subtitle: 'Digital Learning Platform',
        status: 'delayed',
        badge: { text: 'Delayed', bg: '#FFEDD5', textColor: '#9A3412' },
        progressPct: 40,
        due: 'Due: Nov 2024',
        metricLabel: 'Education',
        icon: '🎓',
        gradientFrom: '#60a5fa',
        gradientTo: '#2563eb',
        progressFrom: SDG.orange,
        progressTo: '#fb923c',
        metricColor: SDG.blue,
        tooltip: 'Budget: $32,000 spent | Partner: EduFuture Foundation',
        team: [4, 5],
        cta: { label: 'View Details', color: SDG.blue },
      },
      {
        id: 'p3',
        title: 'Healthcare Access',
        subtitle: 'Mobile Health Clinics',
        status: 'completed',
        badge: { text: 'Completed', bg: '#DBEAFE', textColor: '#1E40AF' },
        progressPct: 100,
        due: 'Completed: Oct 2024',
        metricLabel: 'Healthcare',
        icon: '❤️',
        gradientFrom: '#2dd4bf',
        gradientTo: '#0d9488',
        progressFrom: SDG.teal,
        progressTo: '#2dd4bf',
        metricColor: SDG.teal,
        tooltip: 'Budget: $50,000 spent | Partner: HealthFirst Alliance',
        team: [6, 7, 8],
        cta: { label: 'View Report', color: SDG.teal },
      },
      {
        id: 'p4',
        title: 'Solar Energy Project',
        subtitle: 'Renewable Energy Initiative',
        status: 'on-track',
        badge: { text: 'On Track', bg: '#DCFCE7', textColor: '#166534' },
        progressPct: 75,
        due: 'Due: Jan 2025',
        metricLabel: 'Clean Energy',
        icon: '⚡',
        gradientFrom: '#facc15',
        gradientTo: '#f97316',
        progressFrom: '#facc15',
        progressTo: '#f97316',
        metricColor: '#f59e0b',
        tooltip: 'Budget: $28,000 spent | Partner: CleanEnergy Coalition',
        team: [9, 1],
        cta: { label: 'View Details', color: '#f59e0b' },
      },
    ],
    []
  )

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.status === filter)
  }, [filter, projects])

  const timeline = [
    { color: SDG.green, text: 'Q1 2024 - 3 Projects Initiated' },
    { color: SDG.blue, text: 'Q2 2024 - 2 Projects Completed' },
    { color: SDG.teal, text: 'Q3 2024 - 4 Projects Active' },
  ]

  return { filter, setFilter, projects: filtered, timeline }
}



export default function useComparison() {
  const projects = [
    {
      id: 'solar',
      icon: '☀️',
      name: 'Solar Village Initiative',
      subtitle: 'Rural Energy Access',
      cost: '$450K',
      costTip: 'Cost per beneficiary: $52',
      impactPct: '85%',
      impactScore: '8.5',
      impactTip: '8,650 people benefited\nExpected CO₂ saved: 340 tons/year',
      sdg: ['7', '13'],
      esg: 'A+',
      risk: 'Low',
    },
    {
      id: 'education',
      icon: '🎓',
      name: 'Education for All',
      subtitle: 'Digital Learning Platform',
      cost: '$680K',
      costTip: 'Cost per student: $34',
      impactPct: '92%',
      impactScore: '9.2',
      impactTip: '20,000 children educated\n95% completion rate',
      sdg: ['4', '5'],
      esg: 'A',
      risk: 'Very Low',
    },
    {
      id: 'water',
      icon: '💧',
      name: 'Clean Water Access',
      subtitle: 'Community Wells Project',
      cost: '$320K',
      impactPct: '78%',
      impactScore: '7.8',
      sdg: ['6'],
      esg: 'A-',
      risk: 'Medium',
    },
  ]

  const selectedCount = projects.length

  return { projects, selectedCount }
}



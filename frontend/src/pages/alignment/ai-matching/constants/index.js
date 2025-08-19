export const HERO_STATS = [
  { label: 'Projects Found', value: '47' },
  { label: 'Avg Alignment', value: '94%' },
  { label: 'SDGs Covered', value: '12' },
]

export const ALIGNMENT_FILTERS = [
  { id: 'high', label: 'High (90-100%)', colorDotClass: 'bg-emerald-500', defaultChecked: true },
  { id: 'medium', label: 'Medium (70-89%)', colorDotClass: 'bg-yellow-500', defaultChecked: true },
  { id: 'low', label: 'Low (50-69%)', colorDotClass: 'bg-red-500', defaultChecked: false },
]

export const INVESTMENT_RANGES = [
  'All Ranges',
  '$10K - $50K',
  '$50K - $200K',
  '$200K - $1M',
  '$1M+',
]

export const TIMELINE_FILTERS = [
  { id: 'short', label: 'Short-term (3-12 months)', defaultChecked: true },
  { id: 'medium', label: 'Medium-term (1-3 years)', defaultChecked: true },
  { id: 'long', label: 'Long-term (3+ years)', defaultChecked: false },
]

export const SDG_FOCUS = [
  { id: 'sdg4', label: 'SDG 4', colorClass: 'bg-blue-50 hover:bg-blue-100 text-blue-600', icon: '🎓' },
  { id: 'sdg13', label: 'SDG 13', colorClass: 'bg-green-50 hover:bg-green-100 text-green-600', icon: '🍃' },
  { id: 'sdg17', label: 'SDG 17', colorClass: 'bg-purple-50 hover:bg-purple-100 text-purple-600', icon: '🤝' },
]

export const AI_MATCHES = [
  {
    id: 'p1',
    title: 'Clean Water Initiative - Rural Communities',
    summary: 'Providing sustainable water solutions to 50,000 people across 25 villages in Southeast Asia',
    alignmentScore: 96,
    investmentRange: '$250K - $500K',
    timeline: '18 months',
    location: 'Vietnam, Cambodia',
    tags: [
      { icon: '💧', bg: 'bg-blue-100', fg: 'text-blue-600' },
      { icon: '🍃', bg: 'bg-green-100', fg: 'text-green-600' },
      { icon: '👥', bg: 'bg-purple-100', fg: 'text-purple-600' },
    ],
  },
  {
    id: 'p2',
    title: 'Digital Education Platform',
    summary: 'AI-powered learning platform reaching 100,000 underserved students globally',
    alignmentScore: 92,
    investmentRange: '$150K - $300K',
    timeline: '24 months',
    location: 'Global',
    tags: [
      { icon: '🎓', bg: 'bg-blue-100', fg: 'text-blue-600' },
      { icon: '💻', bg: 'bg-orange-100', fg: 'text-orange-600' },
      { icon: '🤝', bg: 'bg-purple-100', fg: 'text-purple-600' },
    ],
  },
  {
    id: 'p3',
    title: 'Renewable Energy Microgrids',
    summary: 'Solar-powered microgrids for 30 remote communities, reducing carbon emissions by 15,000 tons annually',
    alignmentScore: 87,
    investmentRange: '$800K - $1.2M',
    timeline: '36 months',
    location: 'Kenya, Tanzania',
    tags: [
      { icon: '☀️', bg: 'bg-yellow-100', fg: 'text-yellow-600' },
      { icon: '🍃', bg: 'bg-green-100', fg: 'text-green-600' },
      { icon: '⚡', bg: 'bg-blue-100', fg: 'text-blue-600' },
    ],
  },
  {
    id: 'p4',
    title: "Women's Economic Empowerment",
    summary: 'Microfinance and skills training program supporting 5,000 women entrepreneurs',
    alignmentScore: 94,
    investmentRange: '$100K - $250K',
    timeline: '12 months',
    location: 'India, Bangladesh',
    tags: [
      { icon: '👗', bg: 'bg-pink-100', fg: 'text-pink-600' },
      { icon: '💼', bg: 'bg-blue-100', fg: 'text-blue-600' },
      { icon: '📈', bg: 'bg-green-100', fg: 'text-green-600' },
    ],
  },
]



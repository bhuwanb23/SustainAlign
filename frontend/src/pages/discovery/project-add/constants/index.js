export const allSdgGoals = [
  { id: 1, name: 'No Poverty', color: 'bg-red-500', icon: '🏠' },
  { id: 2, name: 'Zero Hunger', color: 'bg-orange-500', icon: '🍽️' },
  { id: 3, name: 'Good Health & Well-being', color: 'bg-green-500', icon: '🏥' },
  { id: 4, name: 'Quality Education', color: 'bg-blue-500', icon: '📚' },
  { id: 5, name: 'Gender Equality', color: 'bg-pink-500', icon: '⚖️' },
  { id: 6, name: 'Clean Water & Sanitation', color: 'bg-cyan-500', icon: '💧' },
  { id: 7, name: 'Affordable & Clean Energy', color: 'bg-yellow-500', icon: '⚡' },
  { id: 8, name: 'Decent Work & Economic Growth', color: 'bg-purple-500', icon: '💼' },
  { id: 9, name: 'Industry, Innovation & Infrastructure', color: 'bg-indigo-500', icon: '🏗️' },
  { id: 10, name: 'Reduced Inequalities', color: 'bg-red-600', icon: '⚖️' },
  { id: 11, name: 'Sustainable Cities & Communities', color: 'bg-green-600', icon: '🏙️' },
  { id: 12, name: 'Responsible Consumption & Production', color: 'bg-blue-600', icon: '♻️' },
  { id: 13, name: 'Climate Action', color: 'bg-emerald-500', icon: '🌍' },
  { id: 14, name: 'Life Below Water', color: 'bg-blue-700', icon: '🐠' },
  { id: 15, name: 'Life on Land', color: 'bg-teal-500', icon: '🌲' },
  { id: 16, name: 'Peace, Justice & Strong Institutions', color: 'bg-purple-600', icon: '⚖️' },
  { id: 17, name: 'Partnerships for the Goals', color: 'bg-indigo-600', icon: '🤝' }
]

export const csrFocusAreas = [
  'Education', 'Healthcare', 'Environment', 'Poverty Alleviation',
  'Women Empowerment', 'Clean Energy', 'Water & Sanitation', 'Agriculture',
  'Rural Development', 'Skill Development', 'Digital Literacy', 'Mental Health',
  'Disaster Relief', 'Cultural Preservation', 'Sports & Recreation', 'Technology Access'
]

export const targetBeneficiaries = [
  'Children', 'Women', 'Rural Communities', 'Urban Poor', 'Tribal Communities',
  'Senior Citizens', 'Persons with Disabilities', 'Migrant Workers', 'Street Children',
  'Farmers', 'Artisans', 'Small Business Owners', 'Students', 'Unemployed Youth'
]

export const contributionTypes = [
  'Cash Donation', 'In-kind Support', 'Volunteer Hours', 'Technical Expertise',
  'Equipment & Materials', 'Training & Capacity Building', 'Mentoring', 'Partnership'
]

export const ngoRatings = [
  'Platinum (90-100%)', 'Gold (80-89%)', 'Silver (70-79%)', 'Bronze (60-69%)',
  'Verified (50-59%)', 'Under Review'
]

export const formSteps = [
  { id: 1, title: 'Basic Information', description: 'Project title, description, NGO name, and location' },
  { id: 2, title: 'Thematic Information', description: 'SDG goals, CSR focus areas, and target beneficiaries' },
  { id: 3, title: 'Financial Information', description: 'Project costs, funding requirements, and CSR eligibility' },
  { id: 4, title: 'Timeline & Milestones', description: 'Start/end dates, duration, and key milestones' },
  { id: 5, title: 'Impact Metrics', description: 'Expected outcomes, KPIs, and past impact' },
  { id: 6, title: 'NGO Credibility', description: 'Registration details, certifications, and ratings' },
  { id: 7, title: 'Media & Contact', description: 'Images, documents, video links, and contact information' }
]

export const requiredFields = [
  'projectTitle', 'shortDescription', 'ngoName', 'location', 
  'sdgGoals', 'csrFocusAreas', 'targetBeneficiaries',
  'totalProjectCost', 'fundingRequired', 'csrEligibility', 'preferredContributionType',
  'startDate', 'endDate', 'expectedOutcomes', 'kpis',
  'registrationNumber', 'contactEmail'
]

import { useState } from 'react'

export default function useCompanyDetails() {
  const [company, setCompany] = useState({ name: '', budget: 0, sectors: [], goals: [] })
  const sectors = ['Education', 'Health', 'Climate', 'Water', 'Community']
  const goals = ['Net Zero', 'Diversity & Inclusion', 'Energy Efficiency', 'Waste Reduction', 'Water Conservation', 'Community Engagement']

  const save = () => {
    alert('Company details saved')
  }

  return { company, sectors, goals, setCompany, save }
}



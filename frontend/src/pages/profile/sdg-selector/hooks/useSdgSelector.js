import { useState } from 'react'

const BASE_SDGS = [
  'No Poverty',
  'Zero Hunger',
  'Good Health and Well-being',
  'Quality Education',
  'Clean Water and Sanitation',
  'Affordable and Clean Energy',
  'Decent Work and Economic Growth',
  'Industry, Innovation and Infrastructure',
  'Reduced Inequalities',
  'Sustainable Cities and Communities',
  'Responsible Consumption and Production',
  'Climate Action',
  'Life Below Water',
  'Life On Land',
  'Peace, Justice and Strong Institutions',
  'Partnerships for the Goals',
]

export default function useSdgSelector() {
  const [selected, setSelected] = useState([])
  const toggle = (s) => setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  const save = () => alert(`Saved SDGs: ${selected.join(', ')}`)
  return { sdgs: BASE_SDGS, selected, toggle, save }
}



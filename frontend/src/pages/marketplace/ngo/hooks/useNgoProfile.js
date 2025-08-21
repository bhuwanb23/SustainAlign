import { useMemo, useState } from 'react'

export default function useNgoProfile() {
  const [activeTab, setActiveTab] = useState('impact')

  const header = {
    logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c7ce476191-96e2094d5a9cd6b9ed7a.png',
    name: 'GreenEarth Foundation',
    status: 'Active',
  }

  const hero = {
    title: 'Empowering Communities Through Sustainable Development',
    description:
      'We work tirelessly to create lasting positive impact through environmental conservation, education, and community empowerment programs across 15 countries.',
    tags: [
      { text: 'SDG 1: No Poverty', bg: 'bg-blue-100', textColor: 'text-blue-800' },
      { text: 'SDG 4: Quality Education', bg: 'bg-green-100', textColor: 'text-green-800' },
      { text: 'SDG 13: Climate Action', bg: 'bg-emerald-500', textColor: 'text-white' },
      { text: 'SDG 6: Clean Water', bg: 'bg-sky-200', textColor: 'text-blue-900' },
    ],
    stats: [
      { value: '2.5M+', label: 'Trees Planted' },
      { value: '150K+', label: 'Lives Impacted' },
      { value: '85%', label: 'Efficiency Rate' },
    ],
    trust: { score: 92, label: 'out of 100', remark: 'Excellent Rating' },
  }

  const impactTimeline = [
    {
      year: '2024',
      title: 'Clean Water Initiative - Kenya',
      description: 'Installed 45 water purification systems serving 12,000 people in rural communities.',
      metrics: [
        { value: '12,000', label: 'People Served', color: 'text-blue-800', bg: 'bg-sky-200/40' },
        { value: '45', label: 'Systems Installed', color: 'text-green-800', bg: 'bg-green-100' },
        { value: '98%', label: 'Success Rate', color: 'text-yellow-800', bg: 'bg-yellow-100' },
      ],
    },
    {
      year: '2023',
      title: 'Reforestation Project - Brazil',
      description: 'Planted 500,000 native trees across 2,000 hectares of degraded Amazon rainforest.',
      metrics: [
        { value: '500K', label: 'Trees Planted', color: 'text-green-800', bg: 'bg-green-100' },
        { value: '2,000', label: 'Hectares Restored', color: 'text-blue-800', bg: 'bg-sky-200/40' },
        { value: '85%', label: 'Survival Rate', color: 'text-purple-800', bg: 'bg-purple-100' },
      ],
    },
  ]

  const documents = {
    legal: [
      { type: 'pdf', title: 'NGO Registration Certificate' },
      { type: 'pdf', title: 'Tax Exemption Certificate' },
    ],
    annual: [
      { type: 'doc', title: 'Annual Report 2023' },
      { type: 'doc', title: 'Annual Report 2022' },
    ],
  }

  const transparency = {
    allocation: [
      { label: 'Program Activities', color: 'bg-emerald-500', value: 78 },
      { label: 'Administrative', color: 'bg-yellow-400', value: 12 },
      { label: 'Fundraising', color: 'bg-blue-400', value: 10 },
    ],
    audits: [
      { title: 'PwC Audit 2023', badge: 'Clean' },
      { title: 'Deloitte Audit 2022', badge: 'Clean' },
    ],
  }

  const certificates = [
    { icon: '🏅', title: 'GuideStar Gold Seal', desc: 'Transparency and accountability certification', valid: 'Valid until 2025', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { icon: '🍃', title: 'Carbon Neutral Certified', desc: 'Climate impact verification', valid: 'Valid until 2024', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: '🛡️', title: 'ISO 9001:2015', desc: 'Quality management system', valid: 'Valid until 2026', color: 'text-blue-600', bg: 'bg-blue-100' },
  ]

  const testimonials = [
    {
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      name: 'Sarah Johnson',
      role: 'Community Leader, Kenya',
      quote:
        '"The clean water project transformed our village. Our children no longer walk hours for water and can focus on education. GreenEarth Foundation truly cares about sustainable impact."',
      stars: 5,
    },
    {
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      name: 'Carlos Rodriguez',
      role: 'Environmental Scientist',
      quote:
        '"Working with GreenEarth on the reforestation project was incredible. Their scientific approach and community engagement made the 85% tree survival rate possible."',
      stars: 5,
    },
  ]

  return { activeTab, setActiveTab, header, hero, impactTimeline, documents, transparency, certificates, testimonials }
}



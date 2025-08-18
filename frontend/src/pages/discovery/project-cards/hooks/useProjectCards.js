export default function useProjectCards() {
  const projects = [
    { id: 'p1', title: 'Clean Water Initiative', ngo: 'AquaTrust', sdg: 'Clean Water and Sanitation', credibility: 'High', impact: '50,000 people', budget: 450000 },
    { id: 'p2', title: 'Education Access Program', ngo: 'EduCare', sdg: 'Quality Education', credibility: 'Medium', impact: '10,000 students', budget: 320000 },
    { id: 'p3', title: 'Renewable Energy Project', ngo: 'SunRise', sdg: 'Affordable and Clean Energy', credibility: 'High', impact: '5MW Solar', budget: 780000 },
  ]
  return { projects }
}



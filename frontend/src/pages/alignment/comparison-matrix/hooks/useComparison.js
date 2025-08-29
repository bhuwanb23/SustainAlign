export default function useComparison() {
  let projects = []
  try {
    const saved = JSON.parse(localStorage.getItem('comparisonSelected') || '[]')
    projects = Array.isArray(saved) ? saved : []
  } catch (e) {
    projects = []
  }
  const selectedCount = projects.length
  return { projects, selectedCount }
}



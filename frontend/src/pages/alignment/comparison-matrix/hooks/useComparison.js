export default function useComparison() {
  const columns = ['Project A', 'Project B', 'Project C']
  const rows = [
    { metric: 'Cost', values: ['$450k', '$320k', '$780k'] },
    { metric: 'Impact', values: ['50k people', '10k students', '5MW Solar'] },
    { metric: 'SDG', values: ['Clean Water', 'Quality Education', 'Clean Energy'] },
  ]
  return { columns, rows }
}



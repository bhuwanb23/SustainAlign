import ComparisonTable from './components/ComparisonTable.jsx'
import useComparison from './hooks/useComparison.js'

export default function ComparisonMatrixPage() {
  const { rows, columns } = useComparison()
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Comparison Matrix</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 overflow-auto">
        <ComparisonTable rows={rows} columns={columns} />
      </div>
    </div>
  )
}



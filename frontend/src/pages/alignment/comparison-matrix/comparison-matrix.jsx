import { useState } from 'react'
import useComparison from './hooks/useComparison.js'
import Toolbar from './components/Toolbar.jsx'
import KpiStrip from './components/KpiStrip.jsx'
import ProjectRow from './components/ProjectRow.jsx'
import { CostImpactChart, EsgScoreChart } from './components/Charts.jsx'

export default function ComparisonMatrixPage() {
  const { projects, selectedCount } = useComparison()
  const [mode, setMode] = useState('table')
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg flex items-center justify-center text-white">🌿</div>
            <h1 className="text-2xl font-bold text-gray-900">Project Comparison Matrix</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{selectedCount} Projects Selected</span>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">Export Report</button>
          </div>
        </div>
      </header>
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <Toolbar mode={mode} onMode={setMode} selectedCount={selectedCount} />
        <KpiStrip />
      </section>

      {mode === 'table' ? (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="grid grid-cols-8 gap-4 p-6 font-semibold text-gray-900">
              <div className="col-span-2">Project Name</div>
              <div className="text-center">Cost</div>
              <div className="text-center">Impact Score</div>
              <div className="text-center">SDG Mapping</div>
              <div className="text-center">ESG Score</div>
              <div className="text-center">Risk Level</div>
              <div className="text-center">Actions</div>
            </div>
          </div>
          <div>
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost vs Impact Analysis</h3>
            <CostImpactChart />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ESG Score Comparison</h3>
            <EsgScoreChart />
          </div>
        </section>
      )}
    </div>
  )
}



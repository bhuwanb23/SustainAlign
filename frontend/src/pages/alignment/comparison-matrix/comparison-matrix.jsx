import { useState } from 'react'
import useComparison from './hooks/useComparison.js'
import ProjectRow from './components/ProjectRow.jsx'
import { CostImpactChart, EsgScoreChart } from './components/Charts.jsx'

export default function ComparisonMatrixPage() {
  const { projects, selectedCount } = useComparison()
  const [mode, setMode] = useState('table')
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Hero with visual context and quick actions */}
      <header className="mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold ring-1 ring-white/30">📊</div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight">Project Comparison Matrix</h1>
                  <p className="text-emerald-100">Evaluate shortlisted projects across cost, impact, ESG and risk.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-emerald-100">{selectedCount} Projects Selected</span>
                <button className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg shadow-sm hover:bg-emerald-50">Export Report</button>
                <button onClick={() => setMode(mode === 'table' ? 'visual' : 'table')} className="px-4 py-2 bg-white/10 text-white font-medium rounded-lg ring-1 ring-white/30 hover:bg-white/15 transition">
                  {mode === 'table' ? 'Visual Graphs' : 'Table View'}
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-emerald-100">Avg Impact Score</div>
                <div className="text-2xl font-bold">8.9</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-emerald-100">Median Cost</div>
                <div className="text-2xl font-bold">$560K</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-emerald-100">ESG Rating Spread</div>
                <div className="text-2xl font-bold">A to A+</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      

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



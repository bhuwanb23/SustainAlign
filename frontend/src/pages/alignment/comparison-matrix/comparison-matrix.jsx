import { useMemo, useState } from 'react'
import useComparison from './hooks/useComparison.js'
import ProjectRow from './components/ProjectRow.jsx'
import { CostFundingChart, DurationChart } from './components/Charts.jsx'

function formatNumber(val) {
  const n = typeof val === 'number' ? val : parseFloat(val || 0)
  if (!isFinite(n)) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n.toFixed(0)}`
}

export default function ComparisonMatrixPage() {
  const { projects, selectedCount } = useComparison()
  const [mode, setMode] = useState('table')

  const stats = useMemo(() => {
    if (!projects.length) return { avgFunding: 0, medianDuration: 0, avgPast: 0 }
    const funding = projects.map(p => (typeof p.fundingRequired === 'number' ? p.fundingRequired : parseFloat(p.fundingRequired || 0)))
    const duration = projects.map(p => (typeof p.durationMonths === 'number' ? p.durationMonths : parseFloat(p.durationMonths || 0))).filter(n => isFinite(n) && n > 0)
    const past = projects.map(p => (typeof p.pastProjectsCompleted === 'number' ? p.pastProjectsCompleted : parseFloat(p.pastProjectsCompleted || 0)))
    const avgFunding = funding.reduce((a, b) => a + (isFinite(b) ? b : 0), 0) / projects.length
    const sortedDur = [...duration].sort((a, b) => a - b)
    const mid = Math.floor(sortedDur.length / 2)
    const medianDuration = sortedDur.length ? (sortedDur.length % 2 ? sortedDur[mid] : (sortedDur[mid - 1] + sortedDur[mid]) / 2) : 0
    const avgPast = past.reduce((a, b) => a + (isFinite(b) ? b : 0), 0) / projects.length
    return { avgFunding, medianDuration, avgPast }
  }, [projects])

  const maxes = useMemo(() => {
    const maxCost = projects.reduce((m, p) => Math.max(m, (typeof p.cost === 'number' ? p.cost : parseFloat(p.cost || 0)) || 0), 0)
    const maxFunding = projects.reduce((m, p) => Math.max(m, (typeof p.fundingRequired === 'number' ? p.fundingRequired : parseFloat(p.fundingRequired || 0)) || 0), 0)
    const maxDuration = projects.reduce((m, p) => Math.max(m, (typeof p.durationMonths === 'number' ? p.durationMonths : parseFloat(p.durationMonths || 0)) || 0), 0)
    return { maxCost, maxFunding, maxDuration }
  }, [projects])

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
                  <p className="text-emerald-100">Evaluate shortlisted projects across cost and key metrics.</p>
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
                <div className="text-sm text-emerald-100">Avg Funding Required</div>
                <div className="text-2xl font-bold">{formatNumber(stats.avgFunding)}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-emerald-100">Median Duration</div>
                <div className="text-2xl font-bold">{formatNumber(stats.medianDuration)}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-emerald-100">Avg Past Projects</div>
                <div className="text-2xl font-bold">{formatNumber(stats.avgPast)}</div>
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
              <div className="text-center">Funding Required</div>
              <div className="text-center">Duration (months)</div>
              <div className="text-center">Past Projects</div>
              <div className="text-center">SDG Mapping</div>
              <div className="text-center">Actions</div>
            </div>
          </div>
          <div>
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} maxCost={maxes.maxCost} maxFunding={maxes.maxFunding} maxDuration={maxes.maxDuration} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost vs Funding Required</h3>
            <CostFundingChart projects={projects} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration Distribution</h3>
            <DurationChart projects={projects} />
          </div>
        </section>
      )}
    </div>
  )
}



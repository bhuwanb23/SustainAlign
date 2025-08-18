import RiskPanel from './components/RiskPanel.jsx'
import useRiskScoring from './hooks/useRiskScoring.js'

export default function RiskScoringPage() {
  const { items } = useRiskScoring()
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Risk & Credibility</h1>
      <RiskPanel items={items} />
    </div>
  )
}



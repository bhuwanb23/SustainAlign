import MatchList from './components/MatchList.jsx'
import useAiMatching from './hooks/useAiMatching.js'

export default function AiMatchingPage() {
  const { matches } = useAiMatching()
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">AI Matching Results</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <MatchList items={matches} />
      </div>
    </div>
  )
}



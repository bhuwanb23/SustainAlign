import SdgGrid from './components/SdgGrid.jsx'
import useSdgSelector from './hooks/useSdgSelector.js'

export default function SdgSelectorPage() {
  const { sdgs, selected, toggle, save } = useSdgSelector()
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">ESG / SDG Selector</h1>
        <p className="text-gray-600 mt-1">Select priority UN SDGs and ESG goals.</p>
      </header>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <SdgGrid sdgs={sdgs} selected={selected} toggle={toggle} />
        <div className="text-right mt-6">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}



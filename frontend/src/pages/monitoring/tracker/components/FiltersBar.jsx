export default function FiltersBar({ filter, setFilter }) {
  const Btn = ({ value, children }) => {
    const isActive = filter === value
    const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors'
    if (isActive) {
      return (
        <button className={`${base} bg-[#4CAF50] text-white`} onClick={() => setFilter(value)}>
          {children}
        </button>
      )
    }
    return (
      <button className={`${base} bg-gray-100 text-gray-700 hover:bg-gray-200`} onClick={() => setFilter(value)}>
        {children}
      </button>
    )
  }

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
          <div className="flex space-x-2">
            <Btn value="all">All Projects</Btn>
            <Btn value="approved">✅ Approved</Btn>
            <Btn value="on-track">✔️ On Track</Btn>
            <Btn value="delayed">⚠️ Delayed</Btn>
            <Btn value="completed">🏁 Completed</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}



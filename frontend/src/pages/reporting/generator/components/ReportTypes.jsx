export default function ReportTypes({ reportTypes, selected, onSelect }) {
  const getColorClasses = (color) => {
    const colorMap = {
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', selected: 'border-green-500 bg-green-50' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', selected: 'border-blue-500 bg-blue-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', selected: 'border-purple-500 bg-purple-50' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', selected: 'border-orange-500 bg-orange-50' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', selected: 'border-red-500 bg-red-50' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', selected: 'border-indigo-500 bg-indigo-50' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', selected: 'border-pink-500 bg-pink-50' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200', selected: 'border-cyan-500 bg-cyan-50' }
    }
    return colorMap[color] || colorMap.green
  }

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Select Report Type</h2>
        <p className="text-gray-600 mt-1">Choose the type of comprehensive report you want to generate</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((t) => {
          const colors = getColorClasses(t.color)
          const isSelected = selected === t.key
          
          return (
            <button
              type="button"
              key={t.key}
              onClick={() => onSelect(t.key)}
              className={`report-card bg-white rounded-xl shadow-sm border-2 ${colors.border} p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                isSelected ? colors.selected : 'hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors.bg}`}>
                <span className={`${colors.text} text-lg`}>{t.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 text-left">{t.key}</h3>
              <p className="text-xs text-gray-600 text-left leading-relaxed">
                {t.description}
              </p>
              
              {isSelected && (
                <div className="mt-3 flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Report Type Summary */}
      {selected && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 mr-2">📋</span>
            <div>
              <h4 className="text-sm font-medium text-blue-800">Selected Report Type</h4>
              <p className="text-sm text-blue-700">
                {reportTypes.find(t => t.key === selected)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}



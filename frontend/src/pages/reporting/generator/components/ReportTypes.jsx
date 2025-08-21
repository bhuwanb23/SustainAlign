export default function ReportTypes({ reportTypes, selected, onSelect }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Report Type</h2>
      <div className="grid grid-cols-3 gap-6">
        {reportTypes.map((t) => (
          <button
            type="button"
            key={t.key}
            onClick={() => onSelect(t.key)}
            className={`report-card bg-white rounded-xl shadow-sm border-2 ${t.border} p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selected === t.key ? 'border-green-500 bg-green-50' : ''
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              t.color === 'green' ? 'bg-green-100' : t.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              <span className={`${t.color === 'green' ? 'text-green-600' : t.color === 'blue' ? 'text-blue-600' : 'text-purple-600'} text-xl`}>{t.icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.key}</h3>
            <p className="text-sm text-gray-600">
              {t.key === 'CSR Compliance' && 'Corporate social responsibility metrics and compliance tracking'}
              {t.key === 'ESG Progress' && 'Environmental, social, and governance performance analysis'}
              {t.key === 'SDG Impact' && 'Sustainable Development Goals contribution assessment'}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}



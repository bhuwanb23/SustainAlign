import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import ReportTypes from './components/ReportTypes.jsx'
import ReportPreview from './components/ReportPreview.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import useReportGenerator from './hooks/useReportGenerator.js'

export default function ReportGeneratorPage() {
  const {
    metrics,
    period,
    reportType,
    isGenerating,
    lastUpdated,
    periodOptions,
    reportTypes,
    toggleMetric,
    selectPeriod,
    selectReportType,
    generate,
  } = useReportGenerator()

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <Sidebar
            metrics={metrics}
            toggleMetric={toggleMetric}
            period={period}
            periodOptions={periodOptions}
            selectPeriod={selectPeriod}
            onGenerate={generate}
          />

          <div className="flex-1">
            <ReportTypes reportTypes={reportTypes} selected={reportType} onSelect={selectReportType} />
            <ReportPreview isGenerating={isGenerating} lastUpdated={lastUpdated} />
          </div>
        </div>
      </main>
      <FloatingActions />
    </div>
  )
}



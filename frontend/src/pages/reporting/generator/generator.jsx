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
    reportJobs,
    loading,
    error,
    currentJob,
    periodOptions,
    reportTypes,
    toggleMetric,
    selectPeriod,
    selectReportType,
    generate,
    loadReportJobs,
  } = useReportGenerator()

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-blue-700">Loading report jobs...</span>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          <Sidebar
            metrics={metrics}
            toggleMetric={toggleMetric}
            period={period}
            periodOptions={periodOptions}
            selectPeriod={selectPeriod}
            onGenerate={generate}
            isGenerating={isGenerating}
          />

          <div className="flex-1">
            <ReportTypes reportTypes={reportTypes} selected={reportType} onSelect={selectReportType} />
            <ReportPreview 
              isGenerating={isGenerating} 
              lastUpdated={lastUpdated}
              currentJob={currentJob}
              reportJobs={reportJobs}
            />
          </div>
        </div>
      </main>
      <FloatingActions />
    </div>
  )
}



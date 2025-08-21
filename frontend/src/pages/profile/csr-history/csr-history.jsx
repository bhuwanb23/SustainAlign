import useCsrHistory from './hooks/useCsrHistory.js'
import Header from './components/Header.jsx'
import TipsSidebar from './components/TipsSidebar.jsx'
import UploadArea from './components/UploadArea.jsx'
import FileProgress from './components/FileProgress.jsx'
import ParsedCard from './components/ParsedCard.jsx'
import SuccessPopup from './components/SuccessPopup.jsx'

export default function CsrHistoryPage() {
  const {
    files,
    isUploading,
    uploadProgress,
    uploadingFileName,
    showSuccess,
    parsedCards,
    onDrop,
    onSelectFiles,
    parseFile,
    closeSuccess,
  } = useCsrHistory()

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TipsSidebar />

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload CSR/ESG Reports</h2>
                <p className="text-gray-600">Upload your historical sustainability reports for AI-powered analysis</p>
              </div>

              <UploadArea onDrop={onDrop} onFilesSelect={onSelectFiles} />

              <FileProgress isUploading={isUploading} fileName={uploadingFileName} progress={uploadProgress} />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedCards.map((c) => (
                <ParsedCard key={c.id} icon={c.icon} badge={c.badge} title={c.title} value={c.value} description={c.description} color={c.color} />
              ))}
            </div>

            {!!files.length && (
              <div className="mt-8 space-y-3">
                {files.map((f) => (
                  <div key={f.name} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="text-gray-800 font-medium">{f.name}</div>
                    <button className="text-emerald-700 hover:text-emerald-800" onClick={() => parseFile(f)}>AI Preview</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <SuccessPopup open={showSuccess} onClose={closeSuccess} />
    </div>
  )
}



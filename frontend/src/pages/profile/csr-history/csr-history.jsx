import UploadPanel from './components/UploadPanel.jsx'
import useCsrHistory from './hooks/useCsrHistory.js'

export default function CsrHistoryPage() {
  const { files, onDrop, parseFile } = useCsrHistory()
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">CSR History Upload</h1>
        <p className="text-gray-600 mt-1">Upload previous CSR/ESG reports. AI preview included.</p>
      </header>
      <UploadPanel files={files} onDrop={onDrop} onParse={parseFile} />
    </div>
  )
}



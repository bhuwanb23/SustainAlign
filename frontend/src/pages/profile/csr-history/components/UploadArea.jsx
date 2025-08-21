export default function UploadArea({ onDrop, onFilesSelect }) {
  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-emerald-500 transition-colors cursor-pointer bg-gray-50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        onDrop(Array.from(e.dataTransfer.files))
      }}
      onClick={() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.multiple = true
        input.onchange = (ev) => onFilesSelect(ev.target.files)
        input.click()
      }}
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center">
        <span className="text-emerald-600 text-2xl">☁️</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop files here or click to browse</h3>
      <p className="text-gray-600 mb-4">Support for PDF, Excel, and Word documents up to 50MB</p>
      <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
        Choose Files
      </button>
    </div>
  )
}



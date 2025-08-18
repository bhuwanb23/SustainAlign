export default function UploadPanel({ files, onDrop, onParse }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div
        className="border-2 border-dashed border-emerald-300 rounded-xl p-10 text-center text-gray-600 hover:bg-emerald-50/30 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          onDrop(Array.from(e.dataTransfer.files))
        }}
      >
        Drag & drop CSR/ESG reports here or click to upload
      </div>
      {!!files.length && (
        <div className="mt-6 space-y-3">
          {files.map((f) => (
            <div key={f.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="text-gray-800 font-medium">{f.name}</div>
              <button className="text-emerald-700 hover:text-emerald-800" onClick={() => onParse(f)}>AI Preview</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



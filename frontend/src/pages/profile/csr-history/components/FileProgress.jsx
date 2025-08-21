export default function FileProgress({ isUploading, fileName, progress }) {
  if (!isUploading) return null
  return (
    <div className="mt-6">
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">{fileName}</span>
          <span className="text-sm text-gray-600">Uploading...</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}



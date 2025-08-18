export default function CollaborationToolsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Collaboration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">Chat Area</div>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">Documents</div>
      </div>
    </div>
  )
}



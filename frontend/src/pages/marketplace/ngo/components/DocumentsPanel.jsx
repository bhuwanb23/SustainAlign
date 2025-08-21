function DocItem({ icon, title }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center"><span className="mr-3">{icon}</span><span className="font-medium">{title}</span></div>
      <button className="text-emerald-500 hover:text-green-600">⬇️</button>
    </div>
  )
}

export default function DocumentsPanel({ documents }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-lg mb-4">Legal Documents</h4>
        <div className="space-y-3">
          {documents.legal.map((d) => (
            <DocItem key={d.title} icon="📄" title={d.title} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-lg mb-4">Annual Reports</h4>
        <div className="space-y-3">
          {documents.annual.map((d) => (
            <DocItem key={d.title} icon="📘" title={d.title} />
          ))}
        </div>
      </div>
    </div>
  )
}



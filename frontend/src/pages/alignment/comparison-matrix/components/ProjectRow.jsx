export default function ProjectRow({ project }) {
  return (
    <div className="grid grid-cols-8 gap-4 p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-sky-50 hover:from-emerald-100/30 hover:to-sky-100/30 transition-colors">
      <div className="col-span-2 flex items-center space-x-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
          {project.icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.subtitle}</p>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <span className="font-semibold text-gray-900">{project.cost}</span>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: project.impactPct }} />
          </div>
          <span className="ml-2 text-sm font-medium">{project.impactScore}</span>
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="flex space-x-1">
          {project.sdg.map((n) => (
            <span key={n} className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">{n}</span>
          ))}
        </div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">{project.esg}</div>
      </div>
      <div className="text-center flex items-center justify-center">
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">{project.risk}</div>
      </div>
      <div className="text-center flex items-center justify-center space-x-2">
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">Select</button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Save</button>
      </div>
    </div>
  )
}



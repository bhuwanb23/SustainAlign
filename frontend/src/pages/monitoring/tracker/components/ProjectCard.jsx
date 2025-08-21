function TeamAvatars({ ids }) {
  const url = (n) => `https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${n}.jpg`
  return (
    <div className="flex -space-x-2">
      {ids.map((n) => (
        <img key={n} src={url(n)} className="w-8 h-8 rounded-full border-2 border-white" alt="Team member" />
      ))}
    </div>
  )
}

export default function ProjectCard({ project }) {
  return (
    <div className="project-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg relative">
      <div className="tooltip absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0">
        {project.tooltip}
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo})` }}>
            <span className="text-white text-lg">{project.icon}</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
            <p className="text-sm text-gray-500">{project.subtitle}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: project.badge.bg, color: project.badge.textColor }}>
          {project.badge.text}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{project.progressPct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="progress-bar h-2 rounded-full" style={{ width: `${project.progressPct}%`, background: `linear-gradient(90deg, ${project.progressFrom}, ${project.progressTo})` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sdg-blue">📅</span>
          <span className="text-sm text-gray-600">{project.due}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sdg-teal">🏷️</span>
          <span className="text-sm text-gray-600">{project.metricLabel}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <TeamAvatars ids={project.team} />
        <button className="text-sm font-medium" style={{ color: project.cta.color }}>{project.cta.label}</button>
      </div>
    </div>
  )
}



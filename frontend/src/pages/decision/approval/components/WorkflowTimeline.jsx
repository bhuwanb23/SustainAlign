function Step({ icon, title, desc, statusClass, badge, badgeColor, body }) {
  return (
    <div className="relative flex items-start mb-12">
      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-4 ${statusClass} relative z-10`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="ml-6 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        <div className={`rounded-lg p-4 mb-4 ${badgeColor?.bg || 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${badgeColor?.text || 'text-gray-600'}`}>Status: {badge}</span>
            {badgeColor?.spinner ? (
              <div className={`w-6 h-6 border-2 ${badgeColor.border} border-t-transparent rounded-full animate-spin`} />
            ) : (
              badgeColor?.icon || null
            )}
          </div>
          {body}
        </div>
      </div>
    </div>
  )
}

export default function WorkflowTimeline() {
  return (
    <section className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Approval Workflow</h2>
        <div className="relative">
          <div className="absolute left-8 top-16 bottom-0 w-0.5 progress-line step-active" />

          <Step
            icon="🍃"
            title="Environmental Review"
            desc="Initial assessment of environmental impact and compliance requirements."
            statusClass="bg-green-100 border-green-500 text-green-600"
            badge="Completed"
            badgeColor={{ bg: 'bg-green-50', text: 'text-green-800', icon: <span className="text-green-600">✓</span> }}
            body={<p className="text-sm text-green-700">All environmental criteria met. Carbon footprint reduced by 35%.</p>}
          />

          <Step
            icon="🤝"
            title="Stakeholder Evaluation"
            desc="Assessment of business impact and stakeholder alignment."
            statusClass="bg-blue-100 border-blue-500 text-blue-600"
            badge="In Progress"
            badgeColor={{ bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-600', spinner: true }}
            body={<p className="text-sm text-blue-700">Awaiting final stakeholder feedback. 2 of 3 approvals received.</p>}
          />

          <Step
            icon="✔️"
            title="Final Approval"
            desc="Executive decision and formal project authorization."
            statusClass="bg-gray-100 border-gray-300 text-gray-400"
            badge="Pending"
            badgeColor={{ bg: 'bg-gray-50', text: 'text-gray-600' }}
            body={<p className="text-sm text-gray-500">Awaiting your decision to proceed.</p>}
          />

          <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-200" id="action-buttons">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105">
              💾 Save Draft
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              ✔️ Approve
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105">
              ✖️ Reject
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}



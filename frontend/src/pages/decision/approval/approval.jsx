import { useState } from 'react'
import HeaderBar from './components/HeaderBar.jsx'
import WorkflowTimeline from './components/WorkflowTimeline.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'
import ApprovedProjectsList from './components/ApprovedProjectsList.jsx'
import ProjectHeader from './components/ProjectHeader.jsx'

export default function ApprovalWorkflowPage() {
  const [selected, setSelected] = useState(null)
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBar selected={selected} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ApprovedProjectsList onSelect={setSelected} selectedApprovalId={selected?.id} />
          </div>
          <div className="lg:col-span-2">
            <ProjectHeader selected={selected} />
            <SummaryPanel selected={selected} />
            <WorkflowTimeline approval={selected} />
          </div>
        </div>
      </main>
    </div>
  )
}



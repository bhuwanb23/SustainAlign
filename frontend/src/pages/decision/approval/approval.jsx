import HeaderBar from './components/HeaderBar.jsx'
import WorkflowTimeline from './components/WorkflowTimeline.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'

export default function ApprovalWorkflowPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <WorkflowTimeline />
          <SummaryPanel />
        </div>
      </main>
    </div>
  )
}



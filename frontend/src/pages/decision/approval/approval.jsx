import { useState, useEffect } from 'react'
import HeaderBar from './components/HeaderBar.jsx'
import WorkflowTimeline from './components/WorkflowTimeline.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'
import ApprovedProjectsList from './components/ApprovedProjectsList.jsx'
import ProjectHeader from './components/ProjectHeader.jsx'
import './approval.css'

export default function ApprovalWorkflowPage() {
  const [selected, setSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Add loading state for better UX
  const handleProjectSelect = async (project) => {
    setIsLoading(true)
    setSelected(project)
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300)
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 min-h-screen">
      <HeaderBar selected={selected} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 approval-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 approval-grid">
          {/* Left Sidebar - Project List */}
          <div className="lg:col-span-1 slide-in-left">
            <div className="sticky top-8">
              <ApprovedProjectsList 
                onSelect={handleProjectSelect} 
                selectedApprovalId={selected?.id} 
              />
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="lg:col-span-2 space-y-6 slide-in-right">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading project details...</p>
                </div>
              </div>
            ) : selected ? (
              <div className="fade-in-up">
                <ProjectHeader selected={selected} />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <SummaryPanel selected={selected} />
                  <WorkflowTimeline approval={selected} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center card-hover">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <span className="text-2xl sm:text-3xl">📋</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Select a Project</h2>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                  Choose a project from the list to view its approval workflow, 
                  project details, and make decisions.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}



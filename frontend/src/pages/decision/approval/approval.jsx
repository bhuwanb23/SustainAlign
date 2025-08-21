export default function ApprovalWorkflowPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Approval Workflow</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-4">
        <ol className="list-decimal pl-6 space-y-2 text-gray-800">
          <li>Review Recommendation</li>
          <li>Compliance Notes</li>
          <li>Approve / Reject</li>
        </ol>
        <div className="flex gap-3 pt-2">
          <button className="px-4 py-2 rounded-xl bg-gray-100">Save</button>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Approve</button>
          <button className="px-4 py-2 rounded-xl bg-red-500 text-white">Reject</button>
        </div>
      </div>
    </div>
  )
}



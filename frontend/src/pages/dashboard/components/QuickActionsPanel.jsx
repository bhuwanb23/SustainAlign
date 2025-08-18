export default function QuickActionsPanel({ onFind, onReport, onMonitor, onSettings }) {
  const Btn = ({ children, onClick, className='' }) => (
    <button onClick={onClick} className={`w-full px-4 py-2.5 rounded-xl text-white shadow-sm ${className}`}>{children}</button>
  )
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Btn onClick={onFind} className="bg-emerald-600 hover:bg-emerald-700">🟢 Find New Projects</Btn>
        <Btn onClick={onReport} className="bg-sky-600 hover:bg-sky-700">📊 Generate Report</Btn>
        <Btn onClick={onMonitor} className="bg-purple-600 hover:bg-purple-700">🔍 View Monitoring</Btn>
        <Btn onClick={onSettings} className="bg-gray-800 hover:bg-black">⚙️ Admin Settings</Btn>
      </div>
    </div>
  )
}


